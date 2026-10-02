import { useState } from "react";
import { TopBar, Notice, Disclaimer } from "../components/ui.jsx";
import { api, isCloud } from "../store.js";

const PREMIUM = [
  "Full identity profile", "Advanced relationship compatibility", "Extended number library",
  "Personalized devotional plans", "Saved & family profiles", "Advanced Scripture study",
  "Name analysis", "Premium shareable cards", "AI-assisted reflection",
];

export default function Profile({ user, go, onUser, onSignOut }) {
  const [f, setF] = useState({
    firstName: user.firstName, lastName: user.lastName, birthDate: user.birthDate,
    gender: user.gender || "", relationshipStatus: user.relationshipStatus || "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setSaved(false); };

  async function savePatch(e) {
    e.preventDefault();
    onUser(await api.update(f));
    setSaved(true);
  }

  function photo(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = async () => onUser(await api.update({ photo: r.result }));
    r.readAsDataURL(file);
  }

  async function removeAccount() {
    if (!confirm("Delete your account and all associated data? This cannot be undone.")) return;
    await api.deleteAccount();
    onSignOut();
  }

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Profile" />
      <div className="shell with-nav fadein">
        <div className="center" style={{ marginBottom: 16 }}>
          <label style={{ cursor: "pointer", display: "inline-block" }}>
            <div style={{
              width: 92, height: 92, borderRadius: "50%", margin: "0 auto 10px",
              border: "1px solid rgba(217,178,106,.5)", overflow: "hidden",
              background: user.photo ? `center/cover url(${user.photo})` : "rgba(255,255,255,.05)",
              display: "grid", placeItems: "center", fontSize: "1.6rem", color: "var(--gold)",
            }}>
              {!user.photo && user.firstName?.[0]?.toUpperCase()}
            </div>
            <span className="xs gold">{user.photo ? "Change photo" : "Add photo (optional)"}</span>
            <input type="file" accept="image/*" onChange={photo} style={{ display: "none" }} />
          </label>
          <h2 style={{ marginTop: 12 }}>{user.firstName} {user.lastName}</h2>
          <p className="xs muted">{user.email} · {user.plan === "premium" ? "GodCode+" : "Free plan"}</p>
        </div>

        <form className="card" onSubmit={savePatch}>
          <div className="eyebrow">Your details</div>
          <label className="field"><span>First name</span><input value={f.firstName} onChange={set("firstName")} required /></label>
          <label className="field"><span>Last name</span><input value={f.lastName} onChange={set("lastName")} /></label>
          <label className="field"><span>Birth date</span><input type="date" value={f.birthDate} onChange={set("birthDate")} required /></label>
          <label className="field"><span>Gender (optional)</span>
            <select value={f.gender} onChange={set("gender")}>
              <option value="">Prefer not to say</option><option>Male</option><option>Female</option>
            </select>
          </label>
          <label className="field"><span>Relationship status (optional)</span>
            <select value={f.relationshipStatus} onChange={set("relationshipStatus")}>
              <option value="">Prefer not to say</option><option>Single</option><option>Dating</option>
              <option>Engaged</option><option>Married</option><option>Widowed</option>
            </select>
          </label>
          <button className="btn secondary" type="submit">{saved ? "Saved ✓" : "Save changes"}</button>
        </form>

        <div className="card">
          <div className="eyebrow">Quick links</div>
          <div className="grid2">
            <button className="tile" onClick={() => go("saved")}>Saved Insights<span className="t-sub">{(user.saved || []).length} items</span></button>
            <button className="tile" onClick={() => go("notwhat")}>What GodCode Is Not<span className="t-sub">Read the guardrails</span></button>
            <button className="tile" onClick={() => go("prayer")}>Prayer<span className="t-sub">13 categories</span></button>
            <button className="tile" onClick={() => go("admin")}>Admin Panel<span className="t-sub">Content & analytics</span></button>
          </div>
        </div>

        <div className="card gold-edge">
          <div className="badge">GodCode+</div>
          <h3 style={{ marginTop: 10 }}>Premium</h3>
          <p className="muted small">Free includes your basic GodCode, number meaning, Scripture, daily devotional and basic prayer. GodCode+ adds:</p>
          <ul className="check">{PREMIUM.map((p) => <li key={p}>{p}</li>)}</ul>
          {isCloud ? (
            <p className="xs gold" style={{ marginTop: 4, marginBottom: 0 }}>
              GodCode+ launches soon — paid plans connect here through Stripe.
            </p>
          ) : (
            <button
              className="btn"
              onClick={() => onUser(api.update({ plan: user.plan === "premium" ? "free" : "premium" }))}
            >
              {user.plan === "premium" ? "Switch back to Free (demo)" : "Preview GodCode+ (demo toggle)"}
            </button>
          )}
          <p className="xs muted" style={{ marginTop: 10, marginBottom: 0 }}>
            Payment is intentionally not hard-coded. The subscription model, plan field, and gating hooks are
            in place so Stripe can be connected at deploy time.
          </p>
        </div>

        <div className="card">
          <div className="eyebrow">Privacy</div>
          <p className="small muted">
            Your name, birth date, email, relationship entries and saved profiles are private to your
            account. Nothing is published, and shared cards include only your first name and number.
          </p>
          <button className="btn ghost" onClick={async () => { await api.signOut(); onSignOut(); }}>Sign out</button>
          <div style={{ height: 10 }} />
          <button className="btn ghost" style={{ color: "#ffb4a8" }} onClick={removeAccount}>Delete account & data</button>
        </div>

        <Notice>
          {isCloud
            ? "Your data is stored in your private account and is never shared."
            : "This demo build stores everything locally in your browser. In production the same API surface points at an authenticated server where each user can only read their own records."}
        </Notice>
        <Disclaimer />
      </div>
    </>
  );
}
