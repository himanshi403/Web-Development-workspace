import { NavLink } from "react-router-dom";
function Sidebar(){
    return(
    <aside className="sidebar">
        <h2>Job Tracker</h2>

        <NavLink to="/dashboard">
        Dashboard
        </NavLink>

        <NavLink to="/profile">
        Profile
        </NavLink>

        <NavLink to="/analytics">
         📊 Analytics
        </NavLink>

        <NavLink to="/settings">
        Settings
       </NavLink>

      <NavLink to="/">
        Logout
       </NavLink>

    </aside>
    );
}
export default Sidebar;