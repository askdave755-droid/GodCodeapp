import { useState } from "react";
import { TopBar, Verse, Notice } from "../components/ui.jsx";
import { NUMBERS, getNumber } from "../data/numbers.js";
import { CORE_IDENTITY_SCRIPTURES } from "../data/identity.js";

const TABS = [
  ["numbers", "Number Library"],
  ["scripture", "Scripture"],
  ["666", "Understanding 666"],
  ["not", "What GodCode Is Not"],
];

export default function BibleTab({ go, params }) {
  const [tab, setTab] = useState(params?.tab || "numbers");

  return (
    <>
      <TopBar onBack={() => go("dashboard")} title="Bible" />
      <div className="shell with-nav fadein">
        <div className="tabs">
          {TABS.map(([id, label]) => (
            <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {tab === "numbers" && <NumbersTab go={go} />}
        {tab === "scripture" && <ScriptureTab />}
        {tab === "666" && <SixTab />}
        {tab === "not" && <NotTab />}
      </div>
    </>
  );
}

function NumbersTab({ go }) {
  return (
    <>
      <div className="eyebrow">Biblical number library</div>
      <h1>18 numbers, every claim with Scripture</h1>
      <p className="muted small">
        Biblical symbolism is descriptive, not predictive. Where Scripture is unclear or scholars disagree,
        this library says so rather than inventing a meaning.
      </p>
      <div className="grid3">
        {NUMBERS.map((n) => (
          <button key={n.number} className="numtile" onClick={() => go("number", { n: n.number })}>
            <div>
              {n.number}
              <small>{n.themes[0]}</small>
            </div>
          </button>
        ))}
      </div>
      <Notice>
        Patterns in Scripture are worth noticing. Treating numbers as codes that unlock hidden messages is
        not Bible study — it is divination with a Christian vocabulary. Deuteronomy 18:10–12.
      </Notice>
    </>
  );
}

function ScriptureTab() {
  return (
    <>
      <div className="eyebrow">Scripture library</div>
      <h1>Identity verses to return to</h1>
      {CORE_IDENTITY_SCRIPTURES.map((s) => (
        <div className="card" key={s.ref}>
          <Verse reference={s.ref} text={s.text} />
          <p className="small muted" style={{ marginTop: 12, marginBottom: 6 }}><strong className="gold">Why: </strong>{s.why}</p>
          <p className="small muted" style={{ marginBottom: 0 }}><strong className="gold">Apply: </strong>{s.apply}</p>
        </div>
      ))}
      <Notice>
        Verse text is shown in a common plain-English rendering. Read each passage in your own Bible and in
        context — this app is a pointer, not a replacement. In production, connect a licensed Bible API for
        full translations.
      </Notice>
    </>
  );
}

function SixTab() {
  const n = getNumber(666);
  return (
    <>
      <div className="eyebrow">Education</div>
      <h1>Understanding 666</h1>
      <Notice warn>
        GodCode will never claim that 666 identifies a living person, a political movement, a technology, or
        a nation. If anyone tells you they have decoded it with certainty, be cautious.
      </Notice>

      <div className="card gold-edge">
        <Verse
          reference="Revelation 13:18"
          text="This calls for wisdom: let the one who has understanding calculate the number of the beast, for it is the number of a man, and his number is 666."
        />
      </div>

      <div className="card">
        <div className="eyebrow">The biblical context</div>
        <p className="muted" style={{ marginBottom: 0 }}>
          Revelation was written to seven real churches under pressure from Roman imperial power
          (Revelation 1:4, 9). Chapter 13 describes beastly powers that demand the worship owed to God alone.
          The number appears at the end of that description as a riddle given to readers who already shared
          the author's context.
        </p>
      </div>

      <div className="card">
        <div className="eyebrow">"The number of a man"</div>
        <p className="muted" style={{ marginBottom: 0 }}>
          The text itself says the number belongs to a man (or "humanity" — the Greek allows both). That is a
          limiting statement: whatever 666 refers to, Revelation presents it as human, not cosmic and not
          unknowable.
        </p>
      </div>

      <div className="card">
        <div className="eyebrow">Gematria as a historical concept</div>
        <p className="muted" style={{ marginBottom: 0 }}>
          In Hebrew and Greek, letters also served as numerals, so a name could be totaled into a number.
          This was a known ancient practice, and it is the most common explanation for the riddle. It is a
          historical interpretive method for reading an ancient text — not a technique for decoding modern
          names, dates, or events.
        </p>
      </div>

      <div className="card">
        <div className="eyebrow">Different scholarly interpretations</div>
        <ul className="check" style={{ marginBottom: 0 }}>
          <li><strong>A first-century emperor.</strong> Many scholars connect the number to Nero Caesar through Hebrew gematria. Notably, some early manuscripts read 616, which fits an alternate spelling — this textual variant is often treated as supporting evidence.</li>
          <li><strong>Symbolic shortfall.</strong> Others read 6-6-6 as repeated falling short of seven: a picture of human power endlessly imitating completeness and never reaching it.</li>
          <li><strong>Future figure.</strong> Some traditions expect a yet-future fulfillment. Held humbly, this is a legitimate reading; held dogmatically, it has produced a long history of failed identifications.</li>
        </ul>
      </div>

      <div className="card">
        <div className="eyebrow">Where else 666 appears</div>
        {n.examples.filter((e) => e.ref !== "Revelation 13:18" && e.ref !== "1 John 4:1").map((e) => (
          <div key={e.ref} style={{ marginBottom: 12 }}>
            <Verse reference={e.ref} text={e.text} />
            <p className="xs muted" style={{ marginTop: 6, marginBottom: 0 }}>{e.note}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="eyebrow">Why Christians should avoid sensationalism</div>
        <p className="muted">
          Every generation has produced confident identifications of the Antichrist, and every one of them so
          far has been wrong. The fruit of that speculation is usually fear, division, and lost credibility —
          not holiness.
        </p>
        <p className="muted" style={{ marginBottom: 0 }}>
          Revelation's own pastoral aim is endurance and worship (Revelation 14:12). A reading that leaves you
          anxious and suspicious rather than faithful and hopeful has probably missed the point.
        </p>
      </div>

      <Notice>
        <strong>What this does not mean:</strong> {n.notMean}
      </Notice>
    </>
  );
}

function NotTab() {
  const isNot = [
    "Astrology", "Fortune telling", "Divination", "Tarot", "Psychic readings",
    "Destiny prediction", "A replacement for Scripture", "A replacement for prayer",
    "A replacement for wise counsel", "A scientific personality test",
  ];
  const is = [
    "Biblical education", "Personal reflection", "Scripture exploration",
    "Identity development", "Relationship reflection", "A tool for studying biblical symbolism",
  ];
  return (
    <>
      <div className="eyebrow">Please read this</div>
      <h1>What GodCode is — and is not</h1>
      <p className="muted">
        Numbers in GodCode are a teaching device. They organize biblical material and prompt honest
        reflection. They are not a channel of revelation, and arithmetic on a birth date tells you nothing
        about your future.
      </p>

      <div className="card">
        <div className="eyebrow">GodCode is NOT</div>
        <ul className="check cross" style={{ marginBottom: 0 }}>{isNot.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <div className="card gold-edge">
        <div className="eyebrow">GodCode IS</div>
        <ul className="check" style={{ marginBottom: 0 }}>{is.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>

      <div className="card">
        <div className="eyebrow">Why we are careful</div>
        <Verse
          reference="Deuteronomy 18:10–12"
          text="There shall not be found among you anyone who practices divination or tells fortunes or interprets omens... for whoever does these things is an abomination to the LORD."
        />
        <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>
          Scripture's prohibition is not against noticing patterns; it is against seeking hidden knowledge
          from sources other than God. That line is the one this app is built to respect.
        </p>
      </div>

      <div className="card">
        <div className="eyebrow">Our theological guardrail</div>
        <p className="serif" style={{ fontSize: "1.05rem" }}>
          Your number does not define you.<br />
          Your past does not define you.<br />
          Other people's opinions do not define you.<br />
          <span className="gold">God's Word is the foundation for your identity.</span>
        </p>
        <p className="xs muted" style={{ marginBottom: 0 }}>
          2 Corinthians 5:17 · Ephesians 2:10 · Genesis 1:27 · Romans 12:2 · 1 Peter 2:9 · Galatians 2:20
        </p>
      </div>

      <div className="card">
        <div className="eyebrow">How the content is written</div>
        <ul className="check" style={{ marginBottom: 0 }}>
          <li>Scripture first; nothing here may contradict Scripture.</li>
          <li>No claim of supernatural revelation, and no prediction of the future.</li>
          <li>No invented verses, and no invented Hebrew, Greek, or Aramaic meanings.</li>
          <li>Biblical symbolism is kept clearly separate from personal reflection.</li>
          <li>Personality language is observational — never a diagnosis.</li>
          <li>Where we are uncertain, we say so instead of filling the gap.</li>
        </ul>
      </div>
    </>
  );
}
