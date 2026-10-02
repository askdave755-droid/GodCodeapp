import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { getNumber } from "../data/numbers.js";
import { api } from "../store.js";

export default function NumberDetail({ params, go, onUser, user }) {
  const n = getNumber(Number(params?.n));
  if (!n) {
    return (
      <>
        <TopBar onBack={() => go("library")} />
        <div className="shell with-nav">
          <Notice warn>We couldn't establish a reliable biblical entry for that number.</Notice>
        </div>
      </>
    );
  }
  return (
    <>
      <TopBar onBack={() => go("library")} title={`Number ${n.number}`} />
      <div className="shell with-nav fadein">
        <div className="center halo">
          <div className="bignum" style={{ fontSize: n.number > 99 ? "4.4rem" : "6.4rem" }}>{n.number}</div>
          <h2>{n.title}</h2>
          <div>{n.themes.map((t) => <span className="pill" key={t}>{t}</span>)}</div>
        </div>

        <div className="card">
          <div className="eyebrow">Explanation</div>
          <p className="muted" style={{ marginBottom: 0 }}>{n.explanation}</p>
        </div>

        <div className="eyebrow">Examples in Scripture</div>
        {n.examples.map((e) => (
          <div className="card" key={e.ref}>
            <Verse reference={e.ref} text={e.text} />
            <p className="xs muted" style={{ marginTop: 10, marginBottom: 0 }}>{e.note}</p>
          </div>
        ))}

        <div className="card">
          <div className="eyebrow">Reflection questions</div>
          <ul className="check" style={{ marginBottom: 0 }}>{n.reflection.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>

        <div className="card">
          <div className="eyebrow">Common misunderstandings</div>
          <ul className="check cross" style={{ marginBottom: 0 }}>{n.misunderstandings.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>

        <Notice warn><strong>What this does not mean:</strong> {n.notMean}</Notice>

        {n.number === 666 && (
          <button className="btn secondary" onClick={() => go("sixsixsix")}>Open the full 666 education page</button>
        )}
        <div style={{ height: 10 }} />
        {user && (
          <button
            className="btn ghost"
            onClick={() => { onUser(api.saveInsight({ type: "number", title: `Number ${n.number} — ${n.title}`, body: n.themes.join(" · ") })); go("saved"); }}
          >
            Save to my insights
          </button>
        )}
      </div>
    </>
  );
}
