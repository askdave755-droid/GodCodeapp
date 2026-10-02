export function Wordmark({ small }) {
  return (
    <div className="wordmark" style={{ fontSize: small ? ".95rem" : "1.05rem" }}>
      <div className="mark">G</div>
      <span>GODCODE</span>
    </div>
  );
}

export function TopBar({ title, onBack, right }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        {onBack ? (
          <button className="back" onClick={onBack}>&larr; Back</button>
        ) : (
          <Wordmark small />
        )}
        {title && <div style={{ fontWeight: 600, fontSize: ".95rem", marginLeft: "auto" }}>{title}</div>}
        {right}
      </div>
    </div>
  );
}

export function Verse({ reference, text, children }) {
  return (
    <div className="verse">
      “{text}”
      <span className="ref">{reference}</span>
      {children}
    </div>
  );
}

export function Notice({ children, warn }) {
  return <div className={warn ? "notice warn" : "notice"}>{children}</div>;
}

export function Section({ eyebrow, title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

const ICONS = {
  home: "M3 10.6 12 4l9 6.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  code: "M12 3v18M5.5 7.5l13 9M18.5 7.5l-13 9",
  heart: "M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22zM20 16H6.5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

export function NavIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  );
}

const TABS = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "mycode", label: "My Code", icon: "code" },
  { id: "relationships", label: "Relations", icon: "heart" },
  { id: "devotional", label: "Daily", icon: "sun" },
  { id: "bible", label: "Bible", icon: "book" },
  { id: "profile", label: "Profile", icon: "user" },
];

export function BottomNav({ route, go }) {
  return (
    <nav className="bottomnav">
      <div className="bottomnav-inner">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`navbtn ${route === t.id ? "active" : ""}`}
            onClick={() => go(t.id)}
          >
            <NavIcon name={t.icon} />
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Disclaimer() {
  return (
    <div className="footer">
      GodCode is biblical education and personal reflection — not astrology, divination, or prediction.
      <br />Numbers can point to patterns. Scripture points you to God.
    </div>
  );
}
