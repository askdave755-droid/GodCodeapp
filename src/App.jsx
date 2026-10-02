import { useEffect, useState } from "react";
import { api } from "./store.js";
import { BottomNav } from "./components/ui.jsx";
import Landing from "./screens/Landing.jsx";
import Auth from "./screens/Auth.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import MyCode from "./screens/MyCode.jsx";
import Relationships from "./screens/Relationships.jsx";
import Devotional from "./screens/Devotional.jsx";
import Prayer from "./screens/Prayer.jsx";
import BibleTab from "./screens/BibleTab.jsx";
import NumberDetail from "./screens/NumberDetail.jsx";
import Share from "./screens/Share.jsx";
import Profile from "./screens/Profile.jsx";
import Saved from "./screens/Saved.jsx";
import Admin from "./screens/Admin.jsx";

const NAV_ROUTES = ["dashboard", "mycode", "relationships", "devotional", "bible", "profile"];

export default function App() {
  const [user, setUser] = useState(() => api.current());
  const [route, setRoute] = useState(() => (api.current() ? "dashboard" : "landing"));
  const [params, setParams] = useState({});

  function go(next, p = {}) {
    setParams(p);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  useEffect(() => { document.title = "GodCode — Decode Your Identity. Discover God's Design."; }, []);

  const guard = (el) => (user ? el : <Landing go={go} />);
  const common = { user, go, params, onUser: setUser };

  let screen;
  switch (route) {
    case "landing": screen = <Landing go={go} />; break;
    case "auth": screen = <Auth params={params} go={go} onUser={setUser} />; break;
    case "onboarding": screen = guard(<Onboarding {...common} />); break;
    case "dashboard": screen = guard(<Dashboard {...common} />); break;
    case "mycode": screen = guard(<MyCode {...common} />); break;
    case "relationships": screen = guard(<Relationships {...common} />); break;
    case "devotional": screen = guard(<Devotional {...common} />); break;
    case "prayer": screen = guard(<Prayer {...common} />); break;
    case "saved": screen = guard(<Saved {...common} />); break;
    case "share": screen = guard(<Share {...common} />); break;
    case "admin": screen = guard(<Admin go={go} />); break;
    case "profile":
      screen = guard(<Profile {...common} onSignOut={() => { setUser(null); go("landing"); }} />);
      break;
    case "bible": screen = <BibleTab go={go} params={params} />; break;
    case "library": screen = <BibleTab go={go} params={{ tab: "numbers" }} />; break;
    case "notwhat": screen = <BibleTab go={go} params={{ tab: "not" }} />; break;
    case "sixsixsix": screen = <BibleTab go={go} params={{ tab: "666" }} />; break;
    case "number": screen = <NumberDetail {...common} />; break;
    default: screen = <Landing go={go} />;
  }

  const showNav = !!user && !["landing", "auth"].includes(route);
  const navRoute = NAV_ROUTES.includes(route)
    ? route
    : ["library", "notwhat", "sixsixsix", "number"].includes(route)
    ? "bible"
    : ["prayer", "saved"].includes(route)
    ? "dashboard"
    : ["share"].includes(route)
    ? "mycode"
    : "";

  return (
    <div className="app">
      {screen}
      {showNav && <BottomNav route={navRoute} go={(r) => go(r)} />}
    </div>
  );
}
