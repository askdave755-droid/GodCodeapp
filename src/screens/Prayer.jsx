import { useState } from "react";
import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { PRAYER_CATEGORIES } from "../data/prayers.js";
import { api } from "../store.js";

export default function Prayer({ go, onUser }) {
  const [active, setActive] = useState(PRAYER_CATEGORIES[0].id);
  const [index, setIndex] = useState(0);
  const cat = PRAYER_CATEGORIES.find((c) => c.id === active);
  const prayer = cat.prayers[index % cat.prayers.length];

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Prayer" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Prayer generator</div>
        <h1>Pray about what's actually going on</h1>
        <p className="muted small">
          Every prayer here is informed by a specific passage. GodCode never claims God has spoken to you
          personally through this app.
        </p>

        <div className="tabs">
          {PRAYER_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`tab ${c.id === active ? "active" : ""}`}
              onClick={() => { setActive(c.id); setIndex(0); }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="card gold-edge">
          <div className="eyebrow">{cat.label}</div>
          <p className="serif" style={{ fontSize: "1.05rem" }}>{prayer}</p>
          <div className="btn-row">
            <button className="btn small ghost" onClick={() => setIndex(index + 1)}>Another prayer</button>
            <button
              className="btn small secondary"
              onClick={() => { onUser(api.saveInsight({ type: "prayer", title: `Prayer — ${cat.label}`, body: prayer })); go("saved"); }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="card">
          <div className="eyebrow">Scripture behind this prayer</div>
          <Verse reference={cat.scripture.ref} text={cat.scripture.text} />
        </div>

        {cat.note && <Notice warn>{cat.note}</Notice>}

        <Notice>
          Prayers here are written to be prayed, edited, and made your own. They are not prophecy, and they
          are not a substitute for medical, legal, or financial advice.
        </Notice>
      </div>
    </>
  );
}
