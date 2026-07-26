function QuickActions({ setShowForm }) {
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

      <button className="action-btn">
        📊 Analytics
      </button>

    </div>
  );
}

export default QuickActions;