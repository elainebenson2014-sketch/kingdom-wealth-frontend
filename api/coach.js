// =============================================================================
//  Kingdom Wealth Builders — AI Coach (server-side, data-aware)
//  File:  api/coach.js   (put it in the /api folder of your KWB repo)
//  Runtime: Vercel serverless (Node 18+). No npm packages — uses native fetch,
//           same dependency-free style as your PureLight Stripe functions.
//
//  WHAT IT DOES
//    1. Verifies the logged-in user from their Supabase token
//    2. Pulls THAT user's real financial data from Supabase
//    3. Sends the data to Claude with the Kingdom Wealth persona
//    4. Returns a personalized reply — the Anthropic key never leaves the server
//
//  VERCEL ENVIRONMENT VARIABLES TO SET  (Project → Settings → Environment Variables)
//    ANTHROPIC_API_KEY     your Anthropic API key  (secret — server only)
//    SUPABASE_URL          e.g. https://xxxxxxxx.supabase.co
//    SUPABASE_ANON_KEY     the public anon key (same one already in your frontend)
//
//  >>> PLACEHOLDERS TO CONFIRM are marked with  // ⚠️ CONFIRM
//      They're the table/column names where KWB stores finances. Adjust to match
//      your actual Supabase schema, then redeploy.
// =============================================================================

const ANTHROPIC_MODEL = "claude-sonnet-4-6"; // swap to "claude-haiku-4-5-20251001" for lower cost per message

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [], access_token } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message'." });
    }
    if (!access_token) {
      return res.status(401).json({ error: "Not signed in. Missing access token." });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !ANTHROPIC_API_KEY) {
      console.error("coach.js: missing one or more environment variables");
      return res.status(500).json({ error: "Server not configured." });
    }

    // -------------------------------------------------------------------------
    // 1) Verify the user from their token (this also proves the token is real)
    // -------------------------------------------------------------------------
    const userResp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResp.ok) {
      return res.status(401).json({ error: "Session expired. Please sign in again." });
    }
    const user = await userResp.json();
    const userId = user.id;

    // -------------------------------------------------------------------------
    // 2) Pull this user's financial row from the `plans` table
    //    (RLS-respecting: uses the user's own token)
    // -------------------------------------------------------------------------
    const dataResp = await fetch(
      `${SUPABASE_URL}/rest/v1/plans?user_id=eq.${userId}&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    let financials = {};
    if (dataResp.ok) {
      const rows = await dataResp.json();
      if (rows && rows.length > 0) {
        financials = rows[0]; // columns: income, expenses, savings, total_debt, total_assets, surplus
      }
    } else {
      console.warn("coach.js: could not read financial row", await dataResp.text());
    }

    // -------------------------------------------------------------------------
    // 3) Build the financial context Claude will see, from the real columns.
    //    Anything missing simply gets skipped — it won't crash.
    // -------------------------------------------------------------------------
    const f = financials;
    const facts = [];
    if (f.income != null) facts.push(`Monthly income: $${f.income}`);
    if (f.expenses != null) facts.push(`Monthly expenses: $${f.expenses}`);
    if (f.surplus != null) facts.push(`Monthly surplus available to allocate: $${f.surplus}`);
    if (f.savings != null) facts.push(`Total savings: $${f.savings}`);
    if (f.total_debt != null) facts.push(`Total debt: $${f.total_debt}`);
    if (f.total_assets != null) facts.push(`Total assets: $${f.total_assets}`);

    const userName = (user.user_metadata && user.user_metadata.name) || f.name || "friend";
    const financialContext =
      facts.length > 0
        ? facts.join("\n")
        : "No financial data is on file yet for this user. Encourage them to complete their intake.";

    // -------------------------------------------------------------------------
    // 4) Persona + injected data → the system prompt
    // -------------------------------------------------------------------------
    const systemPrompt = `You are the Kingdom Wealth Coach 👑 inside the Kingdom Wealth Builders app — a warm, faith-rooted financial coach.

VOICE & STYLE
- Encouraging, pastoral, plain-spoken. Speak directly to ${userName}.
- A 👑 emoji is fine occasionally; don't overdo it.
- Weave in scripture only when it genuinely fits — never force it, never more than one verse per reply.
- Teach practical money concepts (budgeting, debt snowball/avalanche, emergency fund, 10-10-80 giving/saving/living).

THE MOST IMPORTANT RULE
- You HAVE this user's real financial data below. USE IT. When they ask about their budget, surplus, debt, or savings, answer with their ACTUAL DOLLAR AMOUNTS — never give a generic answer when a specific one is possible.
- If a specific number isn't in the data below, say you don't see it yet and point them to "Update My Finances" — do not invent figures.

THIS USER'S FINANCIAL DATA
${financialContext}

Keep replies concise and actionable — a few short paragraphs at most.`;

    // -------------------------------------------------------------------------
    // 5) Call Claude (native fetch — no SDK needed)
    // -------------------------------------------------------------------------
    const messages = [
      ...history.filter((m) => m && m.role && m.content),
      { role: "user", content: message },
    ];

    const aiResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("coach.js: Anthropic error", aiResp.status, errText);
      return res.status(502).json({ error: "The Coach is unavailable right now. Please try again." });
    }

    const data = await aiResp.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return res.status(200).json({ reply: reply || "..." });
  } catch (err) {
    console.error("coach.js: unexpected error", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
