import { useState } from "react";
import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { calculateGodCode } from "../lib/godcode.js";
import { buildCompatibility } from "../lib/compat.js";
import { IDENTITY } from "../data/identity.js";
import { api } from "../store.js";

export default function Relationships({ user, go, onUser }) {
  const [a, setA] = useState({ name: user.firstName || "", date: user.birthDate || "" });
  const [b, setB] = useState({ name: "", date: "" });
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  function run(e) {
    e.preventDefault();
    const ca = calculateGodCode(a.date);
    const cb = calculateGodCode(b.date);
    if (!ca || !cb) return setErr("Both birth dates are required.");
    setErr("");
    setResult({
      a: { ...a, code: ca.reduced },
      b: { ...b, code: cb.reduced },
      content: buildCompatibility(a.name || "Person A", ca.reduced, b.name || "Person B", cb.reduced),
    });
    setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  function save() {
    const updated = api.saveInsight({
      type: "relationship",
      title: `${result.a.name} (${result.a.code}) & ${result.b.name} (${result.b.code})`,
      body: "Relationship reflection",
    });
    onUser(updated);
    go("saved");
  }

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Relationships" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Relationship reflection</div>
        <h1>Compare two GodCodes</h1>
        <p className="muted small">
          A conversation starter, not a verdict. GodCode will never tell you that two people are soulmates,
          destined, or chosen for each other — Scripture does not give anyone that information.
        </p>

        <form onSubmit={run}>
          <div className="card">
            <div className="eyebrow">Person A</div>
            <label className="field"><span>Name</span>
              <input value={a.name} onChange={(e) => setA({ ...a, name: e.target.value })} required />
            </label>
            <label className="field" style={{ marginBottom: 0 }}><span>Birth date</span>
              <input type="date" value={a.date} onChange={(e) => setA({ ...a, date: e.target.value })} required />
            </label>
          </div>
          <div className="card">
            <div className="eyebrow">Person B</div>
            <label className="field"><span>Name</span>
              <input value={b.name} onChange={(e) => setB({ ...b, name: e.target.value })} required placeholder="Their first name" />
            </label>
            <label className="field" style={{ marginBottom: 0 }}><span>Birth date</span>
              <input type="date" value={b.date} onChange={(e) => setB({ ...b, date: e.target.value })} required />
            </label>
          </div>
          {err && <div className="error">{err}</div>}
          <button className="btn" type="submit">Generate reflection</button>
        </form>

        {result && (
          <div id="result" className="fadein" style={{ scrollMarginTop: 80, marginTop: 24 }}>
            <div className="hairline" />
            <div className="center">
              <div className="eyebrow">Two profiles</div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
                <div>
                  <div className="bignum" style={{ fontSize: "3.6rem" }}>{result.a.code}</div>
                  <div className="small">{result.a.name}</div>
                </div>
                <div className="gold serif" style={{ fontSize: "1.6rem" }}>&</div>
                <div>
                  <div className="bignum" style={{ fontSize: "3.6rem" }}>{result.b.code}</div>
                  <div className="small">{result.b.name}</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <span className="pill">{IDENTITY[result.a.code].keyword}</span>
                <span className="pill">{IDENTITY[result.b.code].keyword}</span>
              </div>
            </div>

            {[
              ["Communication style", result.content.communication],
              ["Emotional patterns", result.content.emotional],
              ["Conflict patterns", result.content.conflict],
            ].map(([t, body]) => (
              <div className="card" key={t}>
                <div className="eyebrow">{t}</div>
                <p className="muted" style={{ marginBottom: 0 }}>{body}</p>
              </div>
            ))}

            <div className="card">
              <div className="eyebrow">Strengths together</div>
              <ul className="check">{result.content.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="card">
              <div className="eyebrow">Potential friction</div>
              <ul className="check cross">{result.content.friction.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="card">
              <div className="eyebrow">Growth opportunities</div>
              <ul className="check">{result.content.growth.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>

            <div className="eyebrow">Scripture for the relationship</div>
            {result.content.scriptures.map((s) => (
              <div className="card" key={s.ref}>
                <Verse reference={s.ref} text={s.text} />
                <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>{s.why}</p>
              </div>
            ))}

            <Notice warn>
              These profiles suggest areas where your communication styles may complement or challenge one
              another. They say nothing about whether a relationship should begin, continue, or end. For that,
              seek Scripture, prayer, and wise counsel (Proverbs 15:22).
            </Notice>

            <button className="btn secondary" onClick={save}>Save this reflection</button>
          </div>
        )}
      </div>
    </>
  );
}
