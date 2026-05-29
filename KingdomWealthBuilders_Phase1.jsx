/**
 * Kingdom Wealth Builders — Supabase Cloud Sync
 * ------------------------------------------------------------------
 * Drop this in as  src/lib/CloudSync.jsx  and import what you need.
 *
 * It gives you:
 *   1. A single shared Supabase client          -> `supabase`
 *   2. Auth helpers (signup / login / logout)    -> `auth`
 *   3. A React hook for syncing app state         -> `useCloudSync(key, initial)`
 *   4. A guard that fails LOUDLY with a clear message instead of
 *      white-screening the deploy when config is missing.
 *
 * WHY YOUR DEPLOY LIKELY FAILED (read this):
 *   The #1 cause of "works locally, blank screen / build error after deploy"
 *   with Supabase is that the environment variables were set locally (.env)
 *   but were NOT added to the hosting dashboard (Vercel / Netlify).
 *   `createClient(undefined, undefined)` throws at import time and the whole
 *   app fails to mount. This file detects that and shows a readable error.
 *
 * ------------------------------------------------------------------
 * SETUP (one time):
 *
 *   1) npm install @supabase/supabase-js
 *
 *   2) Get your anon (public) key:
 *        Supabase dashboard -> Settings -> API -> "anon / public" key
 *        (This key is SAFE to expose in the frontend. Do NOT use the
 *         service_role key here — that one must stay server-side only.)
 *
 *   3) Add BOTH of these in your LOCAL .env  AND  in your hosting
 *      dashboard's Environment Variables (Vercel: Project -> Settings ->
 *      Environment Variables; redeploy after adding):
 *
 *        VITE_SUPABASE_URL=https://lmugkdwjijhmjhlqnmyk.supabase.co
 *        VITE_SUPABASE_ANON_KEY=paste-your-anon-public-key-here
 *
 *      (The URL falls back to your project automatically if unset, so the
 *       only one you MUST set in the dashboard is the anon key.)
 * ------------------------------------------------------------------
 */

import { createClient } from "@supabase/supabase-js";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Your project ref is public (it appears in every request URL), so it's safe to
// keep as a fallback. The anon key is read from the environment.
const PROJECT_REF = "lmugkdwjijhmjhlqnmyk";
const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`;
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// ─── CONFIG GUARD ─────────────────────────────────────────────────────────────
// Instead of letting createClient throw a cryptic error during the build/mount,
// we surface a clear, fixable message.
let configError = null;
if (!SUPABASE_ANON_KEY) {
  configError =
    "Missing VITE_SUPABASE_ANON_KEY. Add it to your .env locally AND to your " +
    "hosting provider's Environment Variables (then redeploy). Find it in " +
    "Supabase -> Settings -> API -> 'anon / public'.";
  // Log loudly in console too, so it shows up in deploy logs.
  // eslint-disable-next-line no-console
  console.error("[CloudSync] " + configError);
}

// ─── SHARED CLIENT (single instance) ───────────────────────────────────────────
// Creating more than one client triggers "Multiple GoTrueClient instances"
// warnings and subtle auth bugs, so we export exactly one.
export const supabase = configError
  ? null
  : createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });

// ─── AUTH HELPERS ──────────────────────────────────────────────────────────────
export const auth = {
  async signUp({ email, password, name }) {
    if (!supabase) throw new Error(configError);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    return data.user;
  },
  async signIn({ email, password }) {
    if (!supabase) throw new Error(configError);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },
  async signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  },
  async getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  onChange(cb) {
    if (!supabase) return () => {};
    const { data } = supabase.auth.onAuthStateChange((_evt, session) =>
      cb(session?.user ?? null)
    );
    return () => data.subscription.unsubscribe();
  },
};

// ─── useCloudSync HOOK ──────────────────────────────────────────────────────────
/**
 * Two-way sync of a chunk of app state to a `user_state` row in Supabase.
 *
 *   const [plan, setPlan, status] = useCloudSync("financial_plan", { income: 0 });
 *
 * - Loads the saved value on mount (per logged-in user).
 * - Debounced save on every change (default 800ms) so you don't hammer the DB.
 * - Realtime: if the same user edits on another device, this updates live.
 * - Falls back to in-memory only (no crash) when not logged in / not configured.
 *
 * Requires a table like:
 *   create table public.user_state (
 *     user_id uuid references auth.users(id) on delete cascade,
 *     key     text not null,
 *     value   jsonb,
 *     updated_at timestamptz default now(),
 *     primary key (user_id, key)
 *   );
 *   alter table public.user_state enable row level security;
 *   create policy "own rows" on public.user_state
 *     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
 */
export function useCloudSync(key, initialValue, { debounceMs = 800 } = {}) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState("idle"); // idle | loading | saving | saved | offline | error
  const userIdRef = useRef(null);
  const saveTimer = useRef(null);
  const hydrated = useRef(false);

  // Track auth + initial load
  useEffect(() => {
    let active = true;
    if (!supabase) {
      setStatus("offline");
      return;
    }

    const load = async (userId) => {
      userIdRef.current = userId;
      if (!userId) {
        setStatus("offline");
        return;
      }
      setStatus("loading");
      try {
        const { data, error } = await supabase
          .from("user_state")
          .select("value")
          .eq("user_id", userId)
          .eq("key", key)
          .maybeSingle();
        if (error) throw error;
        if (active && data?.value != null) setValue(data.value);
        hydrated.current = true;
        if (active) setStatus("saved");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[CloudSync] load failed:", e.message);
        if (active) setStatus("error");
      }
    };

    auth.getSession().then((s) => load(s?.user?.id ?? null));
    const off = auth.onChange((u) => load(u?.id ?? null));
    return () => {
      active = false;
      off();
    };
  }, [key]);

  // Realtime: pick up changes made on other devices
  useEffect(() => {
    if (!supabase || !userIdRef.current) return;
    const channel = supabase
      .channel(`user_state:${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_state",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          if (
            payload.new?.user_id === userIdRef.current &&
            payload.new?.value != null
          ) {
            setValue(payload.new.value);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [key, status]);

  // Debounced save on change
  useEffect(() => {
    if (!supabase || !userIdRef.current || !hydrated.current) return;
    setStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const { error } = await supabase.from("user_state").upsert(
          {
            user_id: userIdRef.current,
            key,
            value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,key" }
        );
        if (error) throw error;
        setStatus("saved");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[CloudSync] save failed:", e.message);
        setStatus("error");
      }
    }, debounceMs);
    return () => clearTimeout(saveTimer.current);
  }, [value, key, debounceMs]);

  const update = useCallback((next) => {
    setValue((prev) => (typeof next === "function" ? next(prev) : next));
  }, []);

  return [value, update, status];
}

// ─── CONFIG-ERROR BANNER (optional) ─────────────────────────────────────────────
// Render this near the top of your app so a misconfigured deploy shows a
// readable message instead of a blank white screen.
export function CloudSyncConfigBanner() {
  if (!configError) return null;
  return (
    <div
      style={{
        background: "#7f1d1d",
        color: "#fff",
        padding: "10px 16px",
        fontSize: 14,
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      Cloud sync is not configured: {configError}
    </div>
  );
}

