import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    function handleLogout() {

        setLoggingOut(true);

        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Optional: remove old frontend-only job data
        localStorage.removeItem("jobs");

          // Tell App.jsx that the user has logged out.
    window.dispatchEvent(
        new Event("authChange")
    );

        setTimeout(() => {

            navigate("/login");

        }, 500);
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
                    {loggingOut
                        ? "Logging out..."
                        : "🚪 Logout"
                    }
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;