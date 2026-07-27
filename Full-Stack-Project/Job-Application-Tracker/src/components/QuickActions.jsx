import { useNavigate } from "react-router-dom";



function QuickActions({ setShowForm }) {
    const navigate = useNavigate();

  return (
    <div className="quick-actions">

      <button
        className="action-btn"
        onClick={() => setShowForm(true)}
      >
        ➕ Add Job
      </button>

      <button className="action-btn">
        📄 Export Jobs
      </button>

      <button className="action-btn"
      onClick={() => navigate("/analytics")}
      >
        📊 Analytics
      </button>

    </div>
  );
}

export default QuickActions;