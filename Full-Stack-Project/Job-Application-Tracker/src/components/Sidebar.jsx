import { NavLink } from "react-router-dom";

function Sidebar(){

return(

<aside className="sidebar">

<div className="sidebar-top">

<h2>💼 JobTracker</h2>

<p className="sidebar-tagline">

Track. Apply. Succeed.

</p>

</div>

<nav className="sidebar-links">

<NavLink to="/dashboard">🏠 Dashboard</NavLink>

<NavLink to="/profile">👤 Profile</NavLink>

<NavLink to="/analytics">📊 Analytics</NavLink>

<NavLink to="/settings">⚙ Settings</NavLink>

</nav>

<div className="sidebar-summary">

<h3>Quick Summary</h3>

<div className="summary-box">

🔥 Keep Applying!

</div>

<div className="summary-box">

🚀 Dream Job Loading...

</div>

</div>

<div className="sidebar-bottom">

<NavLink to="/">🚪 Logout</NavLink>

</div>

</aside>

);

}

export default Sidebar;