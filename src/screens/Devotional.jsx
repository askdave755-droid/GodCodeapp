import { useState } from "react";
import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { DEVOTIONALS, devotionalForDate } from "../data/devotionals.js";
import { api } from "../store.js";

export default function Devotional({ user, go, onUser }) {
  const [offset, setOffset] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const dev = devotionalForDate(date);
  const [prefs, setPrefs] = useState(user.notify || { push: true, email: false, sms: false });

  function togglePref(k) {
    const next = { ...prefs, [k]: !prefs[k] };
    setPrefs(next);
    onUser(api.update({ notify: next }));
  }

  function save() {
    onUser(api.saveInsight({ type: "devotional", title: dev.title, body: dev.scripture.ref }));
    go("saved");
  }

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Daily GodCode" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">
          {offset === 0 ? "Today" : date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
        </div>
        <h1>{dev.title}</h1>

        <div className="card gold-edge">
          <div className="eyebrow">Today's Scripture</div>
          <Verse reference={dev.scripture.ref} text={dev.scripture.text} />
        </div>

        <div className="card">
          <div className="eyebrow">What this means</div>
          <p className="muted" style={{ marginBottom: 0 }}>{dev.meaning}</p>
        </div>
        <div className="card">
          <div className="eyebrow">Identity reminder</div>
          <p className="serif gold" style={{ marginBottom: 0, fontSize: "1.1rem" }}>{dev.identity}</p>
        </div>
        <div className="card">
          <div className="eyebrow">Today's action</div>
          <p className="muted" style={{ marginBottom: 0 }}>{dev.action}</p>
        </div>
        <div className="card">
          <div className="eyebrow">Prayer</div>
          <p className="serif" style={{ marginBottom: 0 }}>{dev.prayer}</p>
        </div>

        <div className="btn-row">
          <button className="btn ghost small" style={{ flex: 1 }} onClick={() => setOffset(offset - 1)}>← Previous</button>
          <button className="btn ghost small" style={{ flex: 1 }} disabled={offset >= 0} onClick={() => setOffset(offset + 1)}>Next →</button>
        </div>
        <div style={{ height: 10 }} />
        <button className="btn secondary" onClick={save}>Save this devotion</button>

        <div className="hairline" />
        <div className="eyebrow">Delivery</div>
        <div className="card">
          {[["push", "App notification"], ["email", "Email"], ["sms", "SMS (optional)"]].map(([k, label]) => (
            <label key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <input type="checkbox" checked={!!prefs[k]} onChange={() => togglePref(k)} style={{ width: 20, minHeight: 20, height: 20 }} />
              <span>{label}</span>
            </label>
          ))}
          <p className="xs muted" style={{ marginBottom: 0 }}>
            Preferences are stored now; the notification, email, and SMS providers are architecture
            placeholders to be connected at deploy time. Nothing is sent from this build.
          </p>
        </div>

        <Notice>
          The devotional rotates on a fixed schedule — the same reading for everyone on the same day. It is
          never selected based on your number, and it is never a message about your future.
        </Notice>
        <p className="xs muted center">{DEVOTIONALS.length} devotions in rotation.</p>
      </div>
    </>
  );
}
