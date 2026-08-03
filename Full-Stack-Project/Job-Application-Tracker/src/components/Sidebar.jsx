import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const navigate = useNavigate();
const [loggingOut, setLoggingOut] = useState(false);

function handleLogout() {

    setLoggingOut(true);

    setTimeout(() => {

        navigate("/");

    },800);

}
  return (
    <aside className="sidebar">

      <div className="sidebar-header">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="JobTracker"
          className="sidebar-logo"
        />

        <h1 className="sidebar-title">
          JobTracker
        </h1>

      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

        <NavLink to="/analytics">
          📊 Analytics
        </NavLink>

        <NavLink to="/calendar">
          📅 Interview Calendar
        </NavLink>

        <NavLink to="/resume">
          📄 Resume
        </NavLink>

        <NavLink to="/settings">
          ⚙ Settings
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <button
className="logout-btn"
onClick={handleLogout}
disabled={loggingOut}
>

{

loggingOut

?

"Logging out..."

:

"🚪 Logout"

}

</button>

      </div>

    </aside>
  );
}

export default Sidebar;