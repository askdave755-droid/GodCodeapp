import { TopBar, Verse, Disclaimer } from "../components/ui.jsx";
import { calculateGodCode } from "../lib/godcode.js";
import { IDENTITY } from "../data/identity.js";
import { devotionalForDate } from "../data/devotionals.js";

export default function Dashboard({ user, go }) {
  const calc = calculateGodCode(user.birthDate);
  const id = calc ? IDENTITY[calc.reduced] : null;
  const dev = devotionalForDate();

  const tiles = [
    ["My Identity", "Strengths, growth, tendencies", () => go("mycode")],
    ["My Biblical Number", "Themes with Scripture", () => go("number", { n: calc?.reduced })],
    ["My Name", "Meaning and biblical links", () => go("mycode", { scrollTo: "name" })],
    ["My Relationships", "Compare two GodCodes", () => go("relationships")],
    ["Daily Devotional", dev.title, () => go("devotional")],
    ["Prayer", "13 Scripture-informed categories", () => go("prayer")],
    ["Scripture Library", "Identity verses to return to", () => go("bible", { tab: "scripture" })],
    ["Number Library", "18 biblical numbers", () => go("library")],
    ["Saved Insights", `${(user.saved || []).length} saved`, () => go("saved")],
  ];

  return (
    <>
      <TopBar />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Welcome, {user.firstName}</div>

        {calc ? (
          <div className="card gold-edge center halo" style={{ paddingTop: 10 }}>
            <div className="xs muted" style={{ letterSpacing: ".2em", textTransform: "uppercase" }}>Your GodCode</div>
            <div className="bignum">{calc.reduced}</div>
            <div className="pill" style={{ marginTop: 6 }}>{id.keyword}</div>
            <div style={{ height: 8 }} />
            <button className="btn small secondary" onClick={() => go("mycode")}>Open full profile</button>
          </div>
        ) : (
          <div className="card gold-edge">
            <h2>Finish your profile</h2>
            <p className="muted small">Add your birth date to generate your GodCode.</p>
            <button className="btn" onClick={() => go("onboarding")}>Continue</button>
          </div>
        )}

        <div className="eyebrow" style={{ marginTop: 20 }}>Today</div>
        <div className="card" onClick={() => go("devotional")} style={{ cursor: "pointer" }}>
          <div className="badge">Daily GodCode</div>
          <h3 style={{ marginTop: 10 }}>{dev.title}</h3>
          <Verse reference={dev.scripture.ref} text={dev.scripture.text} />
          <div className="gold small" style={{ marginTop: 10 }}>Read today's devotion →</div>
        </div>

        <div className="eyebrow" style={{ marginTop: 20 }}>Explore</div>
        <div className="grid2">
          {tiles.map(([t, s, fn]) => (
            <button key={t} className="tile" onClick={fn}>
              <span className="t-ico">✦</span>
              {t}
              <span className="t-sub">{s}</span>
            </button>
          ))}
        </div>

        <div className="hairline" />
        <button className="btn ghost" onClick={() => go("notwhat")}>What GodCode is — and is not</button>
        <Disclaimer />
      </div>
    </>
  );
}
