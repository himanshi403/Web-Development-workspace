import { NavLink } from "react-router-dom";

function Sidebar() {
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

        <NavLink to="/">
          🚪 Logout
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;