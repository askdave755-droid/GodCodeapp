import { useState } from "react";
import { TopBar, Notice } from "../components/ui.jsx";
import { NUMBERS } from "../data/numbers.js";
import { DEVOTIONALS } from "../data/devotionals.js";
import { PRAYER_CATEGORIES } from "../data/prayers.js";

const ADMIN_KEY = "godcode.admin.v1";
const loadAdmin = () => {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}"); } catch { return {}; }
};
const saveAdmin = (o) => localStorage.setItem(ADMIN_KEY, JSON.stringify(o));

const AI_RULES = [
  "Scripture first.", "Never contradict Scripture.", "Never claim supernatural revelation.",
  "Never predict the future.", "Never claim a number controls destiny.",
  "Never claim God spoke personally through the calculation.", "No occult terminology as a positive framework.",
  "Always distinguish biblical symbolism from personal reflection.", "Use observable personality language.",
  "Encourage prayer, Scripture, wisdom, healthy relationships.", "Provide references for biblical claims.",
  "Never fabricate Bible verses.", "Never fabricate Hebrew, Greek, or Aramaic meanings.",
  "If uncertain, say so.", "Never diagnose mental illness.",
  "No medical, legal, or financial advice presented as prophecy.",
];

export default function Admin({ go }) {
  const [tab, setTab] = useState("content");
  const [state, setState] = useState(loadAdmin());
  const [editing, setEditing] = useState(null);

  const users = (() => {
    try { return (JSON.parse(localStorage.getItem("godcode.v1") || "{}").users) || []; } catch { return []; }
  })();

  function patch(next) { setState(next); saveAdmin(next); }
  function toggleDisabled(kind, id) {
    const key = `${kind}:${id}`;
    const disabled = { ...(state.disabled || {}) };
    disabled[key] = !disabled[key];
    patch({ ...state, disabled });
  }
  const isDisabled = (kind, id) => !!(state.disabled || {})[`${kind}:${id}`];

  function saveOverride(numId, text) {
    const overrides = { ...(state.overrides || {}) };
    overrides[numId] = text;
    patch({ ...state, overrides });
    setEditing(null);
  }

  const savedCount = users.reduce((a, u) => a + (u.saved?.length || 0), 0);

  return (
    <>
      <TopBar onBack={() => go("profile")} title="Admin" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Admin panel</div>
        <h1>Manage GodCode</h1>
        <Notice>
          Demo admin. It reads and writes the same local data layer the app uses — in production this sits
          behind a role check and server-side authorization.
        </Notice>

        <div className="tabs">
          {[["content", "Content"], ["users", "Users"], ["tiers", "Tiers"], ["ai", "AI Rules"], ["analytics", "Analytics"]].map(([id, l]) => (
            <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{l}</button>
          ))}
        </div>

        {tab === "content" && (
          <>
            <div className="eyebrow">Biblical numbers ({NUMBERS.length})</div>
            {NUMBERS.map((n) => (
              <div className="card" key={n.number}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <h3 style={{ margin: 0 }}>{n.number} — {n.title}</h3>
                  <span className="xs muted">{n.examples.length} refs</span>
                </div>
                {editing === n.number ? (
                  <>
                    <textarea
                      defaultValue={(state.overrides || {})[n.number] ?? n.explanation}
                      rows={5}
                      id={`ta-${n.number}`}
                      style={{ marginTop: 10 }}
                    />
                    <div className="btn-row" style={{ marginTop: 8 }}>
                      <button className="btn small" onClick={() => saveOverride(n.number, document.getElementById(`ta-${n.number}`).value)}>Save</button>
                      <button className="btn small ghost" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="small muted">{(state.overrides || {})[n.number] ?? n.explanation}</p>
                    <div className="btn-row">
                      <button className="btn small ghost" onClick={() => setEditing(n.number)}>Edit explanation</button>
                      <button className="btn small ghost" onClick={() => toggleDisabled("number", n.number)}>
                        {isDisabled("number", n.number) ? "Enable" : "Disable"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="hairline" />
            <div className="eyebrow">Devotionals ({DEVOTIONALS.length})</div>
            {DEVOTIONALS.map((d) => (
              <div className="card flat" key={d.title} style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <div>
                  <strong className="small">{d.title}</strong>
                  <div className="xs muted">{d.scripture.ref}</div>
                </div>
                <button className="btn small ghost" onClick={() => toggleDisabled("dev", d.title)}>
                  {isDisabled("dev", d.title) ? "Enable" : "Disable"}
                </button>
              </div>
            ))}

            <div className="hairline" />
            <div className="eyebrow">Prayer categories ({PRAYER_CATEGORIES.length})</div>
            <div>{PRAYER_CATEGORIES.map((c) => <span className="pill" key={c.id}>{c.label} · {c.prayers.length}</span>)}</div>
          </>
        )}

        {tab === "users" && (
          <>
            <div className="eyebrow">Users ({users.length})</div>
            {users.map((u) => (
              <div className="card" key={u.id}>
                <h3 style={{ margin: 0 }}>{u.firstName} {u.lastName}</h3>
                <p className="xs muted" style={{ marginBottom: 6 }}>{u.email} · {u.plan} · joined {new Date(u.createdAt).toLocaleDateString()}</p>
                <p className="xs muted" style={{ marginBottom: 0 }}>Saved items: {u.saved?.length || 0}</p>
              </div>
            ))}
            <Notice>Admins can see account metadata only. Private reflections are never exposed to staff in production.</Notice>
          </>
        )}

        {tab === "tiers" && (
          <>
            <div className="card">
              <div className="eyebrow">Free</div>
              <ul className="check" style={{ marginBottom: 0 }}>
                <li>Basic GodCode</li><li>Basic number meaning</li><li>Basic Scripture</li>
                <li>Daily devotional</li><li>Basic prayer</li>
              </ul>
            </div>
            <div className="card gold-edge">
              <div className="eyebrow">GodCode+</div>
              <ul className="check" style={{ marginBottom: 0 }}>
                <li>Full identity profile</li><li>Advanced compatibility</li><li>Extended number library</li>
                <li>Devotional plans</li><li>Saved & family profiles</li><li>Name analysis</li>
                <li>Premium share cards</li><li>AI reflection</li>
              </ul>
            </div>
            <Notice>Stripe is intentionally not hard-coded. Plan state lives on the user record; connect Stripe Checkout + webhooks to flip it.</Notice>
          </>
        )}

        {tab === "ai" && (
          <>
            <div className="eyebrow">AI response engine — hard rules</div>
            <div className="card">
              <ol className="clean" style={{ marginBottom: 0 }}>{AI_RULES.map((r) => <li key={r} className="small">{r}</li>)}</ol>
            </div>
            <Notice warn>
              Any generated content that cannot cite a verifiable Scripture reference must be withheld and
              shown as: “We couldn't establish a reliable biblical connection for this item.”
            </Notice>
          </>
        )}

        {tab === "analytics" && (
          <div className="grid2">
            {[["Users", users.length], ["Premium", users.filter((u) => u.plan === "premium").length],
              ["Saved insights", savedCount], ["Numbers", NUMBERS.length],
              ["Devotionals", DEVOTIONALS.length], ["Prayer categories", PRAYER_CATEGORIES.length]].map(([k, v]) => (
              <div className="card" key={k} style={{ textAlign: "center" }}>
                <div className="bignum" style={{ fontSize: "2.4rem" }}>{v}</div>
                <div className="xs muted">{k}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
