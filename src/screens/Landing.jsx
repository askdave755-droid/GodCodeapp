import { Wordmark, Verse, Notice } from "../components/ui.jsx";

const STEPS = [
  ["1", "Enter your name", "First and last — that's all we analyze."],
  ["2", "Enter your birth date", "Used only for the transparent calculation."],
  ["3", "Generate your GodCode", "You'll see the exact math, step by step."],
  ["4", "Explore your biblical identity", "Themes, Scripture, and honest reflection."],
  ["5", "Apply the insight", "Devotion, prayer, and conversation."],
];

export default function Landing({ go }) {
  return (
    <div className="shell fadein">
      <div style={{ padding: "22px 0 8px" }}><Wordmark /></div>

      <div className="hero halo">
        <div className="eyebrow">Christian identity · Biblical education</div>
        <h1>Decode Your Identity.<br />Discover <span className="gold">God's Design.</span></h1>
        <p className="muted">
          GodCode combines biblical number symbolism, identity reflection, Scripture, and relationship
          insights to help you better understand yourself through a Christian lens.
        </p>
        <button className="btn" onClick={() => go("auth", { mode: "signup" })}>Discover My GodCode</button>
        <div style={{ height: 10 }} />
        <button className="btn secondary" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
          How It Works
        </button>
      </div>

      <div className="hairline" />

      <div className="card gold-edge center">
        <div className="eyebrow">Important</div>
        <h2 style={{ marginBottom: 10 }}>GodCode does not predict your future.</h2>
        <p className="muted small" style={{ marginBottom: 0 }}>
          Your identity comes from God — not a number. Numbers are simply a framework for biblical
          reflection and education.
        </p>
      </div>

      <div id="how" style={{ scrollMarginTop: 80 }}>
        <div className="eyebrow">How GodCode works</div>
        <h2>Five simple steps</h2>
        {STEPS.map(([n, title, sub]) => (
          <div key={n} className="card flat" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ color: "var(--gold)", fontFamily: "Georgia, serif", fontSize: "1.5rem", lineHeight: 1, width: 24 }}>{n}</div>
            <div>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div className="muted small">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hairline" />

      <div className="card">
        <Verse
          reference="Ephesians 2:10"
          text="For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
        />
      </div>

      <Notice>
        <strong>What GodCode is not:</strong> astrology, fortune telling, divination, tarot, psychic
        reading, destiny prediction, or a replacement for Scripture, prayer, and wise counsel.{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); go("notwhat"); }}>Read the full page →</a>
      </Notice>

      <div className="grid2">
        <button className="tile" onClick={() => go("library")}>
          <span className="t-ico">✦</span>
          Biblical Number Library
          <span className="t-sub">18 numbers, every claim with Scripture</span>
        </button>
        <button className="tile" onClick={() => go("sixsixsix")}>
          <span className="t-ico">✦</span>
          Understanding 666
          <span className="t-sub">Revelation 13:18, handled carefully</span>
        </button>
      </div>

      <div className="hairline" />

      <div className="center" style={{ paddingBottom: 30 }}>
        <div className="eyebrow">GodCode</div>
        <p className="serif" style={{ fontSize: "1.15rem" }}>
          Numbers can point to patterns.<br />Scripture points you to God.
        </p>
        <button className="btn" onClick={() => go("auth", { mode: "signup" })}>Create my free account</button>
        <div style={{ height: 10 }} />
        <button className="btn ghost" onClick={() => go("auth", { mode: "signin" })}>I already have an account</button>
      </div>
    </div>
  );
}
