import { useEffect } from "react";
import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { calculateGodCode, formatDateLong } from "../lib/godcode.js";
import { IDENTITY, MASTER_NOTES, CORE_IDENTITY_SCRIPTURES } from "../data/identity.js";
import { getNumber } from "../data/numbers.js";
import { lookupName } from "../data/names.js";
import { api } from "../store.js";

function pickScriptures(code) {
  // Deterministic 4-verse selection from the core identity set.
  const start = (code - 1) % CORE_IDENTITY_SCRIPTURES.length;
  const out = [];
  for (let i = 0; i < 4; i++) out.push(CORE_IDENTITY_SCRIPTURES[(start + i) % CORE_IDENTITY_SCRIPTURES.length]);
  return out;
}

function profilePrayer(name, code, id) {
  return `Father, thank You for making ${name} in Your image. As I reflect on themes of ${id.keyword
    .toLowerCase()
    .replace(/ • /g, ", ")}, keep me from building my identity on a number, a personality, or other people's opinions. Grow in me what only Your Spirit can grow, give me honesty about my weaknesses, and let Your Word be the foundation I stand on today. In Jesus' mighty name, Amen.`;
}

export default function MyCode({ user, go, params, onUser }) {
  const calc = calculateGodCode(user.birthDate);

  useEffect(() => {
    if (params?.scrollTo) {
      const el = document.getElementById(params.scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }, [params]);

  if (!calc) {
    return (
      <>
        <TopBar onBack={() => go("dashboard")} />
        <div className="shell with-nav">
          <h1>No birth date yet</h1>
          <button className="btn" onClick={() => go("onboarding")}>Add it now</button>
        </div>
      </>
    );
  }

  const code = calc.reduced;
  const id = IDENTITY[code];
  const num = getNumber(code);
  const nameInfo = lookupName(user.firstName);
  const scriptures = pickScriptures(code);
  const prayer = profilePrayer(user.firstName, code, id);
  const masterNote = MASTER_NOTES[calc.total];

  function save() {
    const updated = api.saveInsight({
      type: "profile",
      title: `${user.firstName}'s GodCode ${code}`,
      body: `${id.keyword} — ${num.title}`,
    });
    onUser(updated);
    go("saved");
  }

  const section = (eyebrow, title, body) => (
    <div className="card">
      <div className="eyebrow">{eyebrow}</div>
      <h3>{title}</h3>
      <p className="muted" style={{ marginBottom: 0 }}>{body}</p>
    </div>
  );

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="My Code" />
      <div className="shell with-nav fadein">

        <div className="center halo">
          <div className="eyebrow">Your GodCode</div>
          <div className="bignum">{code}</div>
          <div className="pill">{id.keyword}</div>
          <p className="muted small">{user.firstName} {user.lastName} · {formatDateLong(user.birthDate)}</p>
        </div>

        {/* TRANSPARENT CALCULATION */}
        <div className="eyebrow" style={{ marginTop: 14 }}>How this was calculated</div>
        {calc.steps.map((s, i) => (
          <div className="calcbox" key={i}>
            <span className="lbl">{s.label}</span>
            {s.detail}
          </div>
        ))}
        <div className="calcbox" style={{ borderColor: "rgba(217,178,106,.5)" }}>
          <span className="lbl">Stored values</span>
          Intermediate: {calc.intermediate ?? calc.total} · Reduced GodCode: {code}
        </div>
        {masterNote && <Notice>{masterNote}</Notice>}
        <p className="xs muted">
          This is ordinary arithmetic used as a teaching framework. It is not scientifically proven, not a
          personality test, and not a prediction.
        </p>

        <div className="hairline" />

        {/* BIBLICAL SYMBOLISM */}
        <div className="eyebrow">Biblical symbolism</div>
        <h2>{num.number} — {num.title}</h2>
        <div>{num.themes.map((t) => <span className="pill" key={t}>{t}</span>)}</div>
        <p className="muted">{num.explanation}</p>
        <div className="card">
          {num.examples.slice(0, 2).map((e) => (
            <div key={e.ref} style={{ marginBottom: 14 }}>
              <Verse reference={e.ref} text={e.text} />
              <p className="xs muted" style={{ marginTop: 6, marginBottom: 0 }}>{e.note}</p>
            </div>
          ))}
          <button className="btn small secondary" onClick={() => go("number", { n: code })}>
            See all Scripture for {code} →
          </button>
        </div>
        <Notice warn><strong>What this does not mean:</strong> {num.notMean}</Notice>

        <div className="hairline" />

        {/* IDENTITY REFLECTION */}
        <div className="eyebrow">Your identity reflection</div>
        <h2>Observations, not verdicts</h2>
        <p className="muted small">
          These are reflection prompts in observational language — not diagnoses, not predictions, and not
          claims about your destiny. Take what is useful, test it against Scripture and wise counsel.
        </p>
        <p className="muted">{id.summary}</p>

        <div className="card">
          <div className="eyebrow">Strengths</div>
          <ul className="check">{id.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className="card">
          <div className="eyebrow">Growth areas</div>
          <ul className="check cross">{id.growth.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        {section("Emotional tendencies", "How feelings may move", id.emotional)}
        {section("Communication style", "How you may be heard", id.communication)}
        {section("Decision making", "How you may choose", id.decisions)}
        {section("Relationships", "How you may connect", id.relationships)}
        {section("Leadership", "How you may carry responsibility", id.leadership)}
        {section("Conflict", "How you may handle tension", id.conflict)}
        {section("Spiritual reflection", "Where Scripture speaks", id.spiritual)}

        <div className="hairline" />

        {/* NAME ANALYSIS */}
        <div id="name" style={{ scrollMarginTop: 80 }}>
          <div className="eyebrow">Name analysis</div>
          <h2>{user.firstName}</h2>
          {nameInfo ? (
            <div className="card">
              <div className="eyebrow">Name meaning</div>
              <p><strong className="gold">{nameInfo.meaning}</strong> <span className="muted small">({nameInfo.origin})</span></p>
              {nameInfo.confidence === "partial" && (
                <p className="xs muted">Scholars differ on this etymology — it is given as a likely meaning, not a certainty.</p>
              )}
              <div className="eyebrow" style={{ marginTop: 14 }}>Biblical connection</div>
              <p className="muted">{nameInfo.bible}</p>
              <div className="eyebrow" style={{ marginTop: 14 }}>Identity reflection</div>
              <p className="muted" style={{ marginBottom: 0 }}>
                Your name carries the theme of <span className="gold">{nameInfo.theme.toLowerCase()}</span>.
                Consider where that theme is already visible in your life — and where you resist it. This is a
                reflection on language and history, not a claim that God named you for a specific purpose.
              </p>
            </div>
          ) : (
            <div className="card">
              <p className="muted" style={{ marginBottom: 6 }}>
                We couldn't establish a reliable biblical connection for this name.
              </p>
              <p className="xs muted" style={{ marginBottom: 0 }}>
                Rather than invent an etymology or a Hebrew meaning, GodCode says nothing. Your identity does
                not depend on your name's origin (Genesis 1:27; 2 Corinthians 5:17).
              </p>
            </div>
          )}
        </div>

        <div className="hairline" />

        {/* SCRIPTURE */}
        <div className="eyebrow">Scripture for your journey</div>
        <h2>Four verses to sit with</h2>
        {scriptures.map((s) => (
          <div className="card" key={s.ref}>
            <Verse reference={s.ref} text={s.text} />
            <p className="small muted" style={{ marginTop: 12, marginBottom: 6 }}><strong className="gold">Why: </strong>{s.why}</p>
            <p className="small muted" style={{ marginBottom: 0 }}><strong className="gold">Apply: </strong>{s.apply}</p>
          </div>
        ))}

        {/* REFLECTION QUESTIONS */}
        <div className="card">
          <div className="eyebrow">Reflection questions</div>
          <ul className="check">{num.reflection.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>

        {/* PRAYER */}
        <div className="card gold-edge">
          <div className="eyebrow">Prayer</div>
          <p className="serif" style={{ marginBottom: 0 }}>{prayer}</p>
        </div>

        <div className="btn-row" style={{ marginTop: 6 }}>
          <button className="btn secondary" onClick={save}>Save insight</button>
          <button className="btn" onClick={() => go("share")}>Share card</button>
        </div>

        <Notice>
          <strong>Remember:</strong> your number does not define you. Your past does not define you. Other
          people's opinions do not define you. God's Word is the foundation for your identity.
        </Notice>
      </div>
    </>
  );
}
