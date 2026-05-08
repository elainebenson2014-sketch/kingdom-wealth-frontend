/**
 * Kingdom Wealth Builders — Backend API Proxy
 * Node.js + Express server
 *
 * Responsibilities:
 *  - Keeps your Anthropic API key secret (never exposed to the browser)
 *  - Proxies AI Coach and Journal Insight requests to Anthropic
 *  - Handles user auth (JWT-based, ready for Supabase upgrade)
 *  - Saves & retrieves financial plans per user
 *  - Rate-limits AI requests to protect your costs
 *  - Sends weekly accountability check-in emails (via Nodemailer / SendGrid stub)
 *  - CORS configured for your frontend domain
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

// ─── VALIDATE REQUIRED ENV VARS ───────────────────────────────────────────────
const REQUIRED_ENV = ["ANTHROPIC_API_KEY", "JWT_SECRET"];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`❌  Missing required env var: ${key}`);
    process.exit(1);
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
const app = express();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const PORT = process.env.PORT || 4000;

// ─── IN-MEMORY STORE (swap for Supabase/PostgreSQL in production) ─────────────
// Replace this section with your real database client when ready.
const users = new Map();   // email → { id, name, email, passwordHash, plan, journalEntries }
const plans = new Map();   // userId → financialPlan

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

// CORS — update ALLOWED_ORIGINS in .env for production
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:3000").split(",");
app.use(cors({
  origin: (origin, cb) => {
    // Allow no-origin requests (Postman, curl) in dev
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

// ─── RATE LIMITERS ───────────────────────────────────────────────────────────
// General API limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: "Too many requests — please slow down." },
});

// Strict AI limit — protects your Anthropic bill
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,      // 1 min
  max: 10,                   // 10 AI calls per minute per IP
  message: { error: "AI rate limit reached — wait a moment before sending another message." },
});

app.use(generalLimiter);

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided." });
  }
  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the Kingdom Wealth Builders AI Coach — a warm, expert, faith-centered financial stewardship coach for individuals and families.

Your personality:
- Deeply encouraging, never shame-based or cold
- Blend biblical wisdom naturally with practical financial expertise
- Teach one concept at a time — never overwhelm
- Celebrate every small win enthusiastically
- Reference scripture naturally and meaningfully

Phase 1 capabilities: budget generation (10-10-80 Kingdom method), debt reduction (snowball), savings goals, financial literacy, weekly check-ins, stewardship devotionals.

Phase 2 capabilities: AI financial journal analysis, spending pattern insights, goal tracking coaching, accountability partner guidance, family budgeting, church workshop preparation.

When responding:
- Use **bold** for key points
- Use short bullet lists when listing steps
- Keep responses warm, clear, and practical
- End with a scripture or uplifting encouragement when relevant
- Never make the user feel ashamed of their situation

Current date: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`;

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Kingdom Wealth Builders API", version: "2.0.0" });
});

// ── AUTH ─────────────────────────────────────────────────────────────────────

/**
 * POST /auth/register
 * Body: { name, email, password }
 */
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }
    if (users.has(email.toLowerCase())) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const user = { id, name, email: email.toLowerCase(), passwordHash, createdAt: new Date().toISOString(), journalEntries: [] };

    users.set(email.toLowerCase(), user);

    const token = jwt.sign(
      { id, name, email: email.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log(`✅  New user registered: ${email}`);
    res.status(201).json({ token, user: { id, name, email: user.email } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

/**
 * POST /auth/login
 * Body: { email, password }
 */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = users.get(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log(`✅  User logged in: ${email}`);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

/**
 * GET /auth/me
 * Returns the current authenticated user's profile
 */
app.get("/auth/me", requireAuth, (req, res) => {
  const user = users.get(req.user.email);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
});

// ── FINANCIAL PLAN ────────────────────────────────────────────────────────────

/**
 * POST /plan
 * Saves the user's financial plan
 * Body: { income, expenses, debt, savings, goals, stress, timeline, members }
 */
app.post("/plan", requireAuth, (req, res) => {
  try {
    const { income, expenses, debt, savings, goals, stress, timeline, members } = req.body;

    if (!income || !expenses) {
      return res.status(400).json({ error: "Income and expenses are required." });
    }

    const plan = {
      userId: req.user.id,
      income: parseFloat(income),
      expenses: parseFloat(expenses),
      debt: parseFloat(debt) || 0,
      savings: parseFloat(savings) || 0,
      goals: goals || "",
      stress: stress || "",
      timeline: timeline || "1-2 years",
      members: members || [],
      surplus: parseFloat(income) - parseFloat(expenses),
      updatedAt: new Date().toISOString(),
    };

    plans.set(req.user.id, plan);
    console.log(`💰  Plan saved for user: ${req.user.email}`);
    res.json({ success: true, plan });
  } catch (err) {
    console.error("Save plan error:", err);
    res.status(500).json({ error: "Failed to save plan." });
  }
});

/**
 * GET /plan
 * Returns the current user's financial plan
 */
app.get("/plan", requireAuth, (req, res) => {
  const plan = plans.get(req.user.id);
  if (!plan) return res.status(404).json({ error: "No financial plan found. Please complete the intake form." });
  res.json(plan);
});

// ── JOURNAL ───────────────────────────────────────────────────────────────────

/**
 * POST /journal
 * Saves a journal entry
 * Body: { mood, moodLabel, body }
 */
app.post("/journal", requireAuth, (req, res) => {
  try {
    const { mood, moodLabel, body } = req.body;
    if (!body || body.trim().length < 10) {
      return res.status(400).json({ error: "Journal entry must be at least 10 characters." });
    }

    const user = users.get(req.user.email);
    if (!user) return res.status(404).json({ error: "User not found." });

    const entry = {
      id: `j_${Date.now()}`,
      mood: mood || "😊",
      moodLabel: moodLabel || "Neutral",
      body: body.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString(),
    };

    user.journalEntries = [entry, ...(user.journalEntries || [])].slice(0, 50); // keep last 50
    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error("Journal save error:", err);
    res.status(500).json({ error: "Failed to save journal entry." });
  }
});

/**
 * GET /journal
 * Returns the user's journal entries
 */
app.get("/journal", requireAuth, (req, res) => {
  const user = users.get(req.user.email);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json(user.journalEntries || []);
});

// ── AI ENDPOINTS ──────────────────────────────────────────────────────────────

/**
 * POST /ai/chat
 * Main AI Coach chat endpoint
 * Body: { messages: [{ role, content }], context? }
 *
 * `messages` is the full conversation history.
 * `context`  is optional extra financial context to inject.
 */
app.post("/ai/chat", requireAuth, aiLimiter, async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required." });
    }

    // Validate message structure
    for (const m of messages) {
      if (!["user", "assistant"].includes(m.role) || typeof m.content !== "string") {
        return res.status(400).json({ error: "Invalid message format. Each message needs role and content." });
      }
    }

    // Build system prompt — optionally inject user's financial context
    let systemPrompt = SYSTEM_PROMPT;
    if (context) {
      systemPrompt += `\n\nUser's financial context:\n${context}`;
    }

    // Attach plan context if user has one saved
    const plan = plans.get(req.user.id);
    if (plan) {
      systemPrompt += `\n\nUser's saved plan: Income $${plan.income}/mo, Expenses $${plan.expenses}/mo, Surplus $${plan.surplus}/mo, Debt $${plan.debt}, Savings $${plan.savings}. Goals: ${plan.goals}. Timeline: ${plan.timeline}.`;
    }

    console.log(`🤖  AI chat request from: ${req.user.email} (${messages.length} messages)`);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    });

    const reply = response.content?.[0]?.text || "I'm here to help — could you share a bit more?";
    res.json({ reply, usage: response.usage });
  } catch (err) {
    console.error("AI chat error:", err);
    if (err.status === 429) {
      return res.status(429).json({ error: "AI service is busy. Please try again in a moment." });
    }
    res.status(500).json({ error: "AI coach is temporarily unavailable. Please try again." });
  }
});

/**
 * POST /ai/journal-insight
 * Generates an AI insight for a specific journal entry
 * Body: { entry, mood, moodLabel }
 */
app.post("/ai/journal-insight", requireAuth, aiLimiter, async (req, res) => {
  try {
    const { entry, mood, moodLabel } = req.body;

    if (!entry || entry.trim().length < 10) {
      return res.status(400).json({ error: "Journal entry is too short." });
    }

    const plan = plans.get(req.user.id);
    const planContext = plan
      ? `User's finances: Income $${plan.income}/mo, Debt $${plan.debt}, Savings $${plan.savings}.`
      : "";

    const prompt = `A user is writing in their financial journal.
Mood: ${moodLabel || "Neutral"} ${mood || ""}
Entry: "${entry.trim()}"
${planContext}

Provide a brief (2-3 sentence), warm, faith-centered AI coaching insight about what patterns or themes you notice in this entry. Include one specific encouragement or practical action they can take. Be genuine and personal, not generic.`;

    console.log(`📓  Journal insight request from: ${req.user.email}`);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    const insight = response.content?.[0]?.text || "💡 Every honest entry you write is building financial self-awareness — the foundation of lasting transformation.";
    res.json({ insight });
  } catch (err) {
    console.error("Journal insight error:", err);
    res.status(500).json({ error: "Could not generate insight. Please try again." });
  }
});

/**
 * POST /ai/spending-analysis
 * Analyzes spending data and returns AI coaching recommendations
 * Body: { spending: [{ cat, budget, actual, leak }] }
 */
app.post("/ai/spending-analysis", requireAuth, aiLimiter, async (req, res) => {
  try {
    const { spending } = req.body;
    if (!spending || !Array.isArray(spending)) {
      return res.status(400).json({ error: "spending array is required." });
    }

    const leaks = spending.filter(s => s.leak);
    const totalLeak = leaks.reduce((sum, s) => sum + (s.actual - s.budget), 0);

    const prompt = `Analyze this user's spending data and provide 2-3 specific, actionable coaching recommendations.

Spending leaks found:
${leaks.map(s => `- ${s.cat}: Budget $${s.budget}, Actual $${s.actual} (+$${s.actual - s.budget} over)`).join("\n")}

Total monthly overspend: $${totalLeak}

Provide warm, practical advice on how to fix these leaks. Focus on the biggest leak first. Include one faith-based perspective on stewardship. Keep it to 3 short paragraphs max.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ analysis: response.content?.[0]?.text });
  } catch (err) {
    console.error("Spending analysis error:", err);
    res.status(500).json({ error: "Could not generate spending analysis." });
  }
});

// ── WEEKLY CHECK-IN (stub — wire to email service) ────────────────────────────

/**
 * POST /checkin/send
 * Sends a weekly accountability check-in email to the user
 * In production: replace with SendGrid, Resend, or Nodemailer
 */
app.post("/checkin/send", requireAuth, async (req, res) => {
  try {
    const user = users.get(req.user.email);
    const plan = plans.get(req.user.id);

    if (!user || !plan) {
      return res.status(404).json({ error: "User or plan not found." });
    }

    // Generate personalized check-in message via AI
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `Write a brief, warm, personalized weekly accountability check-in message for ${user.name}. They have $${plan.surplus}/mo surplus, $${plan.debt} in debt, and ${plan.savings} in savings. Include one scripture and one specific action for this week. Keep it to 3 short paragraphs — uplifting and personal.`,
      }],
    });

    const message = response.content?.[0]?.text || "";

    // TODO: Replace this console.log with your real email sender:
    // await sendEmail({ to: user.email, subject: "Your Weekly Kingdom Wealth Check-In", body: message });
    console.log(`📧  Weekly check-in generated for: ${user.email}`);
    console.log("--- EMAIL CONTENT ---");
    console.log(message);
    console.log("---------------------");

    res.json({
      success: true,
      message: "Check-in email generated successfully.",
      preview: message, // Remove this in production to avoid leaking email content
    });
  } catch (err) {
    console.error("Check-in error:", err);
    res.status(500).json({ error: "Failed to generate check-in." });
  }
});

// ── ERROR HANDLER ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n👑  Kingdom Wealth Builders API`);
  console.log(`🚀  Server running on http://localhost:${PORT}`);
  console.log(`🤖  AI Coach: Anthropic claude-sonnet-4-20250514`);
  console.log(`🔐  JWT auth enabled`);
  console.log(`🛡️   Rate limiting active (10 AI calls/min)\n`);
});

export default app;
