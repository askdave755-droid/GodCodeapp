import { useState } from "react";
import { api, isCloud } from "../store.js";
import { TopBar, Notice } from "../components/ui.jsx";

export default function Auth({ params, go, onUser }) {
  const [mode, setMode] = useState(params?.mode === "signin" ? "signin" : "signup");
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const user = await (mode === "signup" ? api.signUp(f) : api.signIn(f));
      onUser(user);
      go(user.birthDate ? "dashboard" : "onboarding");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <TopBar onBack={() => go("landing")} />
      <div className="shell fadein">
        <div className="eyebrow">{mode === "signup" ? "Create account" : "Welcome back"}</div>
        <h1>{mode === "signup" ? "Start your GodCode" : "Sign in"}</h1>
        <p className="muted small">Takes under a minute. We only ask for what the app actually needs.</p>

        <form onSubmit={submit} className="card">
          {mode === "signup" && (
            <>
              <label className="field">
                <span>First name</span>
                <input value={f.firstName} onChange={set("firstName")} required placeholder="David" />
              </label>
              <label className="field">
                <span>Last name (optional)</span>
                <input value={f.lastName} onChange={set("lastName")} placeholder="Okafor" />
              </label>
            </>
          )}
          <label className="field">
            <span>Email</span>
            <input type="email" value={f.email} onChange={set("email")} required placeholder="you@email.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={f.password} onChange={set("password")} required minLength={6} placeholder="At least 6 characters" />
          </label>
          {err && <div className="error">{err}</div>}
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "One moment…" : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="btn-row">
          <button className="btn ghost" disabled title="Connect Google OAuth in production">Google</button>
          <button className="btn ghost" disabled title="Connect Apple Sign-In in production">Apple</button>
        </div>
        <p className="xs muted center" style={{ marginTop: 8 }}>
          Social sign-in is wired as an architecture placeholder — connect Google / Apple OAuth at deploy time.
        </p>

        <div className="center" style={{ margin: "14px 0 20px" }}>
          <button className="back" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
            {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </div>

        <Notice>
          {isCloud
            ? "Your name, birth date and saved profiles stay private to your account and are stored securely. You can delete everything from Profile."
            : "Your name, birth date and saved profiles stay private to your account. This demo build stores data locally on your device — no server, no sharing. You can delete everything from Profile."}
        </Notice>
      </div>
    </>
  );
}
