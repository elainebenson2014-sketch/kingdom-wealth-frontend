/**
 * Kingdom Wealth Builders — Frontend API Client
 *
 * Drop this file into your React app (e.g. src/api.js).
 * Replace all direct Anthropic fetch() calls with these functions.
 *
 * Usage:
 *   import { api } from './api';
 *   const { token } = await api.auth.register({ name, email, password });
 *   const { reply } = await api.ai.chat({ messages });
 */

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Set VITE_API_URL in your frontend .env:
//   VITE_API_URL=http://localhost:4000         (development)
//   VITE_API_URL=https://your-api.railway.app  (production)
const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

// ─── TOKEN STORAGE ────────────────────────────────────────────────────────────
export const tokenStore = {
  get: () => localStorage.getItem("kwb_token"),
  set: (token) => localStorage.setItem("kwb_token", token),
  clear: () => localStorage.removeItem("kwb_token"),
};

// ─── BASE FETCH ───────────────────────────────────────────────────────────────
async function request(path, options = {}) {
  const token = tokenStore.get();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }

  return data;
}

// ─── API METHODS ──────────────────────────────────────────────────────────────
export const api = {

  // ── AUTH ──────────────────────────────────────────────────────────────────

  auth: {
    /**
     * Register a new user.
     * @param {{ name: string, email: string, password: string }} body
     * @returns {{ token: string, user: { id, name, email } }}
     */
    async register(body) {
      const data = await request("/auth/register", { method: "POST", body });
      if (data.token) tokenStore.set(data.token);
      return data;
    },

    /**
     * Log in an existing user.
     * @param {{ email: string, password: string }} body
     * @returns {{ token: string, user: { id, name, email } }}
     */
    async login(body) {
      const data = await request("/auth/login", { method: "POST", body });
      if (data.token) tokenStore.set(data.token);
      return data;
    },

    /**
     * Get the current authenticated user.
     * @returns {{ id, name, email, createdAt }}
     */
    me() {
      return request("/auth/me");
    },

    /** Clear the local token (log out). */
    logout() {
      tokenStore.clear();
    },
  },

  // ── FINANCIAL PLAN ────────────────────────────────────────────────────────

  plan: {
    /**
     * Save the user's financial intake data.
     * @param {{ income, expenses, debt, savings, goals, stress, timeline, members }} body
     */
    save(body) {
      return request("/plan", { method: "POST", body });
    },

    /**
     * Load the user's saved financial plan.
     */
    get() {
      return request("/plan");
    },
  },

  // ── JOURNAL ───────────────────────────────────────────────────────────────

  journal: {
    /**
     * Save a journal entry.
     * @param {{ mood, moodLabel, body }} entry
     */
    save(entry) {
      return request("/journal", { method: "POST", body: entry });
    },

    /**
     * Load all journal entries for the current user.
     */
    list() {
      return request("/journal");
    },
  },

  // ── AI ────────────────────────────────────────────────────────────────────

  ai: {
    /**
     * Send a message to the AI Coach.
     *
     * @param {{
     *   messages: Array<{ role: 'user'|'assistant', content: string }>,
     *   context?: string  // optional extra financial context
     * }} body
     * @returns {{ reply: string, usage: object }}
     *
     * @example
     * const { reply } = await api.ai.chat({
     *   messages: [{ role: 'user', content: 'Help me with my budget' }]
     * });
     */
    chat(body) {
      return request("/ai/chat", { method: "POST", body });
    },

    /**
     * Get an AI insight for a journal entry.
     * @param {{ entry: string, mood: string, moodLabel: string }} body
     * @returns {{ insight: string }}
     */
    journalInsight(body) {
      return request("/ai/journal-insight", { method: "POST", body });
    },

    /**
     * Get AI coaching recommendations for spending data.
     * @param {{ spending: Array<{ cat, budget, actual, leak }> }} body
     * @returns {{ analysis: string }}
     */
    spendingAnalysis(body) {
      return request("/ai/spending-analysis", { method: "POST", body });
    },
  },

  // ── CHECK-IN ──────────────────────────────────────────────────────────────

  checkin: {
    /**
     * Trigger a weekly check-in email for the current user.
     */
    send() {
      return request("/checkin/send", { method: "POST", body: {} });
    },
  },
};

// ─── USAGE EXAMPLES ───────────────────────────────────────────────────────────
/*

// ── In your AuthModal component ──────────────────────────────────────────────

import { api } from './api';

// Register
const { user } = await api.auth.register({ name, email, password });

// Login
const { user } = await api.auth.login({ email, password });

// Logout
api.auth.logout();


// ── Replace the direct Anthropic fetch in AICoach ────────────────────────────

// BEFORE (direct, insecure):
const response = await fetch("https://api.anthropic.com/v1/messages", { ... });

// AFTER (secure, through your proxy):
const { reply } = await api.ai.chat({
  messages: conversationHistory.map(m => ({ role: m.role, content: m.content })),
  context: `Income $${plan.income}, Debt $${plan.debt}`,
});


// ── Replace the journal insight call ─────────────────────────────────────────

// BEFORE:
const response = await fetch("https://api.anthropic.com/v1/messages", { ... });

// AFTER:
const { insight } = await api.ai.journalInsight({
  entry: journalText,
  mood: selectedMood,
  moodLabel: selectedMoodLabel,
});


// ── Save intake form on submission ───────────────────────────────────────────

await api.plan.save({
  income: form.income,
  expenses: form.expenses,
  debt: form.debt,
  savings: form.savings,
  goals: form.goals,
  stress: form.stress,
  timeline: form.timeline,
  members: form.members,
});


// ── Load plan on dashboard mount ─────────────────────────────────────────────

useEffect(() => {
  api.plan.get().then(setPlan).catch(console.error);
}, []);

*/
