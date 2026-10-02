// Local-only persistence layer.
// NOTE: this is a clearly-marked mock of the server/auth layer described in the spec.
// Swap `api` for real endpoints (Postgres + auth + Stripe) without touching the UI.

const KEY = "godcode.v1";

const empty = { users: [], sessionId: null };

// Fallback for environments where localStorage is unavailable (sandboxed iframes,
// private modes, disabled storage). The app stays fully usable for the session.
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

// Demo-only hash. A real build must use server-side hashing (bcrypt/argon2).
function weakHash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return `h${h}`;
}

export const api = {
  current() {
    const s = read();
    return s.users.find((u) => u.id === s.sessionId) || null;
  },
  signUp({ email, password, firstName, lastName }) {
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
  signIn({ email, password }) {
    const s = read();
    const u = s.users.find((x) => x.email === email.trim().toLowerCase());
    if (!u || u.pass !== weakHash(password)) throw new Error("Email or password is incorrect.");
    s.sessionId = u.id;
    write(s);
    return u;
  },
  signOut() {
    const s = read();
    s.sessionId = null;
    write(s);
  },
  update(patch) {
    const s = read();
    const i = s.users.findIndex((u) => u.id === s.sessionId);
    if (i < 0) return null;
    s.users[i] = { ...s.users[i], ...patch };
    write(s);
    return s.users[i];
  },
  deleteAccount() {
    const s = read();
    s.users = s.users.filter((u) => u.id !== s.sessionId);
    s.sessionId = null;
    write(s);
  },
  saveInsight(item) {
    const u = api.current();
    if (!u) return null;
    const saved = [{ id: `s_${Date.now()}`, savedAt: new Date().toISOString(), ...item }, ...(u.saved || [])];
    return api.update({ saved });
  },
  removeInsight(id) {
    const u = api.current();
    if (!u) return null;
    return api.update({ saved: (u.saved || []).filter((s) => s.id !== id) });
  },
};
