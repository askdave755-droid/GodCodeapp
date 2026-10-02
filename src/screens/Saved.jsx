import { TopBar, Notice } from "../components/ui.jsx";
import { api } from "../store.js";

export default function Saved({ user, go, onUser }) {
  const items = user.saved || [];
  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Saved" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Saved insights</div>
        <h1>Things worth returning to</h1>
        {items.length === 0 && (
          <Notice>Nothing saved yet. Tap “Save” on a profile, devotion, prayer, or number.</Notice>
        )}
        {items.map((s) => (
          <div className="card" key={s.id}>
            <div className="eyebrow">{s.type}</div>
            <h3>{s.title}</h3>
            <p className="muted small">{s.body}</p>
            <p className="xs muted">{new Date(s.savedAt).toLocaleString()}</p>
            <button className="btn small ghost" onClick={() => onUser(api.removeInsight(s.id))}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}
