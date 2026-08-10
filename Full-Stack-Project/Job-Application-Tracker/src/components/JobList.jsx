import { useNavigate } from "react-router-dom";

function JobList({
    jobs,
    deleteJob,
    editJob,
    search,
    sortBy,
    statusFilter,
    setShowForm
}) {
    const navigate = useNavigate();

    const getJobId = (job) => job._id || job.id;

    const filteredJobs = jobs
        .filter((job) => {
            const companyName = job.company || "";

            const matchesSearch = companyName
                .toLowerCase()
                .includes((search || "").toLowerCase());

            const matchesStatus =
                statusFilter === "All" ||
                job.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "newest") {
                return (
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
                );
            }

            if (sortBy === "oldest") {
                return (
                    new Date(a.createdAt || 0) -
                    new Date(b.createdAt || 0)
                );
            }

            if (sortBy === "az") {
                return (a.company || "").localeCompare(
                    b.company || ""
                );
            }

            if (sortBy === "za") {
                return (b.company || "").localeCompare(
                    a.company || ""
                );
            }

            if (sortBy === "status") {
                return (a.status || "").localeCompare(
                    b.status || ""
                );
            }

            return 0;
        });

    if (filteredJobs.length === 0) {
        return (
            <div className="empty-state">
                <h2>📄 No Jobs Found</h2>

                <p>
                    Start tracking your first application.
                </p>

                <button
                    className="add-first-job-btn"
                    onClick={() => setShowForm(true)}
                >
                    + Add First Job
                </button>
            </div>
        );
    }

    return (
        <div className="jobs-grid">
            {filteredJobs.map((job) => {
                const jobId = getJobId(job);

                return (
                    <div
                        className="job-card"
                        key={jobId}
                    >
                        <div className="job-top">
                            <div className="company-avatar">
                                {(job.company || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <span
                                className={`status-badge ${
                                    (job.status || "")
                                        .toLowerCase()
                                }`}
                            >
                                {job.status || "Applied"}
                            </span>
                        </div>

                        <h2>
                            {job.company}
                        </h2>

                        <p>
                            {job.role}
                        </p>

                        <span className="job-date">
                            📅{" "}
                            {job.createdAt
                                ? new Date(
                                      job.createdAt
                                  ).toLocaleDateString()
                                : "Not Available"}
                        </span>

                        <div className="job-actions">
                            <button
                                className="view-btn"
                                onClick={() =>
                                    navigate(
                                        `/job/${jobId}`
                                    )
                                }
                            >
                                View Details
                            </button>

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    editJob(job)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteJob(job)
                                }
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default JobList;