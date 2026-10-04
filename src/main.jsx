import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// --- Diagnostic overlay: any fatal error renders on screen instead of a blank page ---
function showError(msg) {
  const el = document.getElementById("root");
  if (el) {
    el.innerHTML =
      '<div style="padding:24px;color:#ff8a80;font:13px/1.6 monospace;white-space:pre-wrap;word-break:break-word">' +
      String(msg).replace(/</g, "&lt;") +
      "</div>";
  }
}
window.addEventListener("error", (e) =>
  showError("ERROR: " + e.message + "\n" + (e.filename || "") + ":" + e.lineno)
);
window.addEventListener("unhandledrejection", (e) =>
  showError("PROMISE REJECTION: " + (e.reason?.message || e.reason))
);

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  showError("MOUNT ERROR: " + err.message + "\n" + (err.stack || ""));
}
// --- end diagnostic overlay ---
