function DeleteModal({ company, onDelete, onCancel }) {
  return (
    <div className="modal-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          🗑️
        </div>

        <h2>Delete Job?</h2>

        <p>

          Are you sure you want to delete

          <strong> {company} </strong>

          ?

        </p>

        <div className="delete-actions">

          <button
          className="cancel-btn"
          onClick={onCancel}
          >
            Cancel
          </button>

          <button
          className="delete-btn"
          onClick={onDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;