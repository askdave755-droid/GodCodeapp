// ============================================================
// Data layer — the UI only ever talks to `api`:
//   current()          → user | null
//   signUp(f)          → user   (async)
//   signIn(f)          → user   (async)
//   signOut()          → void   (async)
//   update(patch)      → user   (async)
//   deleteAccount()    → void   (async)
//   saveInsight(item)  → user   (async)
//   removeInsight(id)  → user   (async)
//
// Every method resolves to the same app-shaped user object:
//   { id, email, firstName, lastName, birthDate, gender,
//     relationshipStatus, photo, plan, notify, people, createdAt, saved[] }
//
// Two backends, chosen at runtime:
//   • Cloud (production) — Supabase Postgres + auth. Active when
//     VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set.
//   • Local (demo) — the original localStorage mock, unchanged behavior.
// ============================================================

import { isCloud, supabase } from "./lib/supabase.js";

/* ------------------------------------------------------------------ */
/* Local demo backend — nothing ever leaves the device                 */
/* ------------------------------------------------------------------ */

const KEY = "godcode.v1";

const empty = { users: [], sessionId: null };

let memory = { ...empty };

function read() {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...memory };
  }
}

function write(state) {
  memory = state;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage blocked — session-only persistence */
  }
  return state;
}

// Demo-only hash. Cloud mode never touches this — Supabase handles credentials.
function weakHash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return `h${h}`;
}

const localApi = {
  async current() {
    const s = read();
    return s.users.find((u) => u.id === s.sessionId) || null;
  },
  async signUp({ email, password, firstName, lastName }) {
    const s = read();
    const e = email.trim().toLowerCase();
    if (s.users.some((u) => u.email === e)) throw new Error("An account with that email already exists.");
    const user = {
      id: `u_${Date.now()}`,
      email: e,
      pass: weakHash(password),
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      birthDate: "",
      gender: "",
      relationshipStatus: "",
      photo: "",
      plan: "free",
      saved: [],
      people: [],
      createdAt: new Date().toISOString(),
    };
    s.users.push(user);
    s.sessionId = user.id;
    write(s);
    return user;
  },
  async signIn({ email, password }) {
    const s = read();
    const u = s.users.find((x) => x.email === email.trim().toLowerCase());
    if (!u || u.pass !== weakHash(password)) throw new Error("Email or password is incorrect.");
    s.sessionId = u.id;
    write(s);
    return u;
  },
  async signOut() {
    const s = read();
    s.sessionId = null;
    write(s);
  },
  async update(patch) {
    const s = read();
    const i = s.users.findIndex((u) => u.id === s.sessionId);
    if (i < 0) return null;
    s.users[i] = { ...s.users[i], ...patch };
    write(s);
    return s.users[i];
  },
  async deleteAccount() {
    const s = read();
    s.users = s.users.filter((u) => u.id !== s.sessionId);
    s.sessionId = null;
    write(s);
  },
  async saveInsight(item) {
    const u = await localApi.current();
    if (!u) return null;
    const saved = [{ id: `s_${Date.now()}`, savedAt: new Date().toISOString(), ...item }, ...(u.saved || [])];
    return localApi.update({ saved });
  },
  async removeInsight(id) {
    const u = await localApi.current();
    if (!u) return null;
    return localApi.update({ saved: (u.saved || []).filter((s) => s.id !== id) });
  },
};

/* ------------------------------------------------------------------ */
/* Cloud backend (Supabase)                                            */
/* ------------------------------------------------------------------ */

let cache = null; // { id, user }

function friendlyAuthMessage(message) {
  const m = (message || "").toLowerCase();
  if (m.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (m.includes("user already registered") || m.includes("already been registered")) return "An account with that email already exists.";
  if (m.includes("email not confirmed")) return "Please confirm your email first, then sign in.";
  if (m.includes("at least 6 characters")) return "Password must be at least 6 characters.";
  return message || "Something went wrong. Please try again.";
}

function rowToUser(row, saved) {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name || "",
    lastName: row.last_name || "",
    birthDate: row.birth_date || "",
    gender: row.gender || "",
    relationshipStatus: row.relationship_status || "",
    photo: row.photo || "",
    plan: row.plan === "premium" ? "premium" : "free",
    notify: row.notify || { push: true, email: false, sms: false },
    people: row.people || [],
    createdAt: row.created_at,
    saved: (saved || []).map((s) => ({
      id: String(s.id),
      type: s.type,
      title: s.title,
      body: s.body,
      savedAt: s.saved_at,
    })),
  };
}

async function loadCloudUser() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    cache = null;
    return null;
  }
  const uid = session.user.id;
  const [{ data: profile, error: pErr }, { data: saved, error: sErr }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", uid).single(),
    supabase.from("saved_insights").select("*").eq("user_id", uid).order("saved_at", { ascending: false }),
  ]);
  if (pErr) throw new Error(pErr.message);
  if (sErr) throw new Error(sErr.message);
  const user = rowToUser(profile, saved || []);
  cache = { id: uid, user };
  return user;
}

// Only these fields may be written by the client. `plan` is deliberately
// absent — it flips only via the Stripe webhook (service role), never here.
const PATCH_COLUMNS = {
  firstName: "first_name",
  lastName: "last_name",
  birthDate: "birth_date",
  gender: "gender",
  relationshipStatus: "relationship_status",
  photo: "photo",
  notify: "notify",
  people: "people",
};

const cloudApi = {
  current: () => loadCloudUser(),

  async signUp({ email, password, firstName, lastName }) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: (firstName || "").trim(),
          last_name: (lastName || "").trim(),
        },
      },
    });
    if (error) throw new Error(friendlyAuthMessage(error.message));
    if (!data.session) {
      throw new Error(
        "Account created — check your email to confirm it, then sign in. " +
        "(Tip: you can disable email confirmation in Supabase → Authentication → Sign In / Providers.)"
      );
    }
    return loadCloudUser();
  },

  async signIn({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw new Error(friendlyAuthMessage(error.message));
    return loadCloudUser();
  },

  async signOut() {
    cache = null;
    await supabase.auth.signOut();
  },

  async update(patch) {
    if (!cache?.id) return null;
    const row = {};
    for (const [key, col] of Object.entries(PATCH_COLUMNS)) {
      if (patch[key] !== undefined) row[col] = patch[key];
    }
    if (Object.keys(row).length) {
      const { error } = await supabase.from("profiles").update(row).eq("id", cache.id);
      if (error) throw new Error(error.message);
    }
    return loadCloudUser();
  },

  async deleteAccount() {
    // Deletes the auth user (cascades to profiles + saved_insights) through
    // the delete-account Edge Function. If it isn't deployed yet, falls back
    // to signing out — rows remain but the user loses access.
    try {
      await supabase.functions.invoke("delete-account", { method: "POST" });
    } catch {
      /* function not deployed — sign out below */
    }
    cache = null;
    await supabase.auth.signOut();
  },

  async saveInsight(item) {
    if (!cache?.id) return null;
    const { error } = await supabase.from("saved_insights").insert({
      user_id: cache.id,
      type: item.type,
      title: item.title,
      body: item.body || "",
    });
    if (error) throw new Error(error.message);
    return loadCloudUser();
  },

  async removeInsight(id) {
    if (!cache?.id) return null;
    const { error } = await supabase
      .from("saved_insights")
      .delete()
      .eq("user_id", cache.id)
      .eq("id", Number(id));
    if (error) throw new Error(error.message);
    return loadCloudUser();
  },
};

/* ------------------------------------------------------------------ */

export const api = isCloud ? cloudApi : localApi;

// Optional session listener: fires with null when the user is signed out
// elsewhere (expired session, password change, etc.). No-op in local mode.
export function onAuthChange(callback) {
  if (!isCloud) return () => {};
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") callback(null);
  });
  return () => subscription.unsubscribe();
}
