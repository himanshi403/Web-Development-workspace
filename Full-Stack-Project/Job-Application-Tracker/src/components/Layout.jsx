import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">
        {children}
      </div>

    </div>
  );
}

export default Layout;