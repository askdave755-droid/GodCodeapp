import { useRef, useState } from "react";
import { TopBar, Notice } from "../components/ui.jsx";
import { calculateGodCode } from "../lib/godcode.js";
import { IDENTITY } from "../data/identity.js";
import { getNumber } from "../data/numbers.js";

const VERSE_REF = "Ephesians 2:10";

export default function Share({ user, go }) {
  const calc = calculateGodCode(user.birthDate);
  const [msg, setMsg] = useState("");
  const canvasRef = useRef(null);

  if (!calc) {
    return (
      <>
        <TopBar onBack={() => go("mycode")} />
        <div className="shell with-nav"><Notice>Add your birth date first.</Notice></div>
      </>
    );
  }

  const code = calc.reduced;
  const id = IDENTITY[code];
  const num = getNumber(code);

  function drawCard() {
    const c = canvasRef.current || document.createElement("canvas");
    const W = 1080, H = 1350;
    c.width = W; c.height = H;
    const g = c.getContext("2d");

    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0e1c42");
    bg.addColorStop(1, "#060c1f");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);

    const glow = g.createRadialGradient(W / 2, 220, 20, W / 2, 220, 620);
    glow.addColorStop(0, "rgba(217,178,106,0.26)");
    glow.addColorStop(1, "rgba(217,178,106,0)");
    g.fillStyle = glow; g.fillRect(0, 0, W, H);

    g.strokeStyle = "rgba(217,178,106,0.45)";
    g.lineWidth = 3;
    g.strokeRect(44, 44, W - 88, H - 88);

    g.textAlign = "center";
    g.fillStyle = "#d9b26a";
    g.font = "600 30px Georgia, serif";
    g.fillText("M Y   G O D C O D E", W / 2, 180);

    g.fillStyle = "#eef2fb";
    g.font = "600 70px Georgia, serif";
    g.fillText(user.firstName, W / 2, 290);

    const ng = g.createLinearGradient(0, 330, 0, 650);
    ng.addColorStop(0, "#ffffff");
    ng.addColorStop(0.5, "#f0d195");
    ng.addColorStop(1, "#a9823f");
    g.fillStyle = ng;
    g.font = "600 330px Georgia, serif";
    g.fillText(String(code), W / 2, 640);

    g.fillStyle = "#d9b26a";
    g.font = "500 30px Georgia, serif";
    g.fillText("BIBLICAL THEME", W / 2, 760);
    g.fillStyle = "#eef2fb";
    g.font = "400 42px Georgia, serif";
    g.fillText(id.keyword, W / 2, 820);

    g.fillStyle = "#d9b26a";
    g.font = "500 30px Georgia, serif";
    g.fillText("SCRIPTURE", W / 2, 920);
    g.fillStyle = "#eef2fb";
    g.font = "400 44px Georgia, serif";
    g.fillText(VERSE_REF, W / 2, 980);

    g.strokeStyle = "rgba(217,178,106,0.4)";
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(240, 1050); g.lineTo(840, 1050); g.stroke();

    g.fillStyle = "#9aa7c4";
    g.font = "400 36px Georgia, serif";
    g.fillText("Decode Your Identity.", W / 2, 1120);
    g.fillText("Discover God's Design.", W / 2, 1172);

    g.fillStyle = "#d9b26a";
    g.font = "700 30px Helvetica, Arial, sans-serif";
    g.fillText("G O D C O D E", W / 2, 1262);

    return c;
  }

  function download() {
    const c = drawCard();
    const a = document.createElement("a");
    a.download = `godcode-${user.firstName.toLowerCase()}-${code}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
    setMsg("Card downloaded.");
  }

  async function share() {
    const text = `My GodCode is ${code} — ${id.keyword}. ${VERSE_REF}. Decode Your Identity. Discover God's Design.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My GodCode", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setMsg("Copied to clipboard.");
    } catch {
      setMsg("Sharing isn't available here — try Download.");
    }
  }

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#/card?name=${encodeURIComponent(user.firstName)}&code=${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setMsg("Link copied. Only the name and number are included — nothing private.");
    } catch {
      setMsg(url);
    }
  }

  return (
    <>
      <TopBar onBack={() => go("mycode")} title="Share" />
      <div className="shell with-nav fadein">
        <div className="eyebrow">Shareable card</div>
        <h1>Your GodCode card</h1>

        <div className="sharecard">
          <div className="eyebrow" style={{ marginBottom: 14 }}>My GodCode</div>
          <div className="serif" style={{ fontSize: "1.5rem" }}>{user.firstName}</div>
          <div className="bignum sc-num">{code}</div>
          <div className="eyebrow" style={{ marginTop: 8 }}>Biblical theme</div>
          <div className="serif" style={{ fontSize: "1.1rem" }}>{id.keyword}</div>
          <div className="eyebrow" style={{ marginTop: 16 }}>Scripture</div>
          <div className="serif" style={{ fontSize: "1.1rem" }}>{VERSE_REF}</div>
          <div style={{ height: 1, background: "rgba(217,178,106,.35)", margin: "20px 30px" }} />
          <p className="muted serif" style={{ marginBottom: 6 }}>Decode Your Identity.<br />Discover God's Design.</p>
          <div className="eyebrow" style={{ marginTop: 14, marginBottom: 0 }}>GodCode</div>
        </div>

        <div style={{ height: 14 }} />
        <button className="btn" onClick={download}>Download image</button>
        <div style={{ height: 10 }} />
        <div className="btn-row">
          <button className="btn secondary" onClick={share}>Share</button>
          <button className="btn secondary" onClick={copyLink}>Copy link</button>
        </div>
        {msg && <p className="small gold center" style={{ marginTop: 12 }}>{msg}</p>}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <Notice>
          Only your first name, number, theme, and a Scripture reference are included. Your birth date,
          email, and saved content are never part of a shared card. ({num.title})
        </Notice>
      </div>
    </>
  );
}
