import { useState } from "react";
import { api } from "../store.js";
import { TopBar, Notice } from "../components/ui.jsx";
import { calculateGodCode } from "../lib/godcode.js";

export default function Onboarding({ user, go, onUser }) {
  const [f, setF] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    birthDate: user.birthDate || "",
    gender: user.gender || "",
    relationshipStatus: user.relationshipStatus || "",
  });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const calc = calculateGodCode(f.birthDate);
    if (!calc) return setErr("Please enter a valid birth date.");
    try {
      const updated = await api.update(f);
      onUser(updated);
      go("mycode");
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <>
      <TopBar onBack={() => go("dashboard")} />
      <div className="shell fadein">
        <div className="eyebrow">Step 2 of 2</div>
        <h1>Your name and birth date</h1>
        <p className="muted small">
          Your birth date is used only for a transparent arithmetic calculation. You'll see every step.
        </p>

        <form onSubmit={submit} className="card">
          <label className="field">
            <span>First name</span>
            <input value={f.firstName} onChange={set("firstName")} required />
          </label>
          <label className="field">
            <span>Last name (optional)</span>
            <input value={f.lastName} onChange={set("lastName")} />
          </label>
          <label className="field">
            <span>Birth date</span>
            <input type="date" value={f.birthDate} onChange={set("birthDate")} required max="2030-12-31" />
          </label>
          <label className="field">
            <span>Gender (optional)</span>
            <select value={f.gender} onChange={set("gender")}>
              <option value="">Prefer not to say</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <label className="field">
            <span>Relationship status (optional)</span>
            <select value={f.relationshipStatus} onChange={set("relationshipStatus")}>
              <option value="">Prefer not to say</option>
              <option>Single</option>
              <option>Dating</option>
              <option>Engaged</option>
              <option>Married</option>
              <option>Widowed</option>
            </select>
          </label>
          {err && <div className="error">{err}</div>}
          <button className="btn" type="submit">Generate my GodCode</button>
        </form>

        <Notice>
          This calculation is a teaching framework, not a scientifically validated instrument and not a
          prediction. Your number does not define you.
        </Notice>
      </div>
    </>
  );
}
