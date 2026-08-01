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

    const filteredJobs = jobs
        .filter(job => {
            const matchesSearch = job.company
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "All" ||
                job.status === statusFilter;

            return matchesSearch && matchesStatus;
        })

        .sort((a, b) => {

            if (sortBy === "newest") return b.id - a.id;

            if (sortBy === "oldest") return a.id - b.id;

            if (sortBy === "az")
                return a.company.localeCompare(b.company);

            if (sortBy === "za")
                return b.company.localeCompare(a.company);

            if (sortBy === "status")
                return a.status.localeCompare(b.status);

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

            {

                filteredJobs.map(job => (

                    <div
                        className="job-card"
                        key={job.id}
                    >

                        <div className="job-top">

                            <div className="company-avatar">

                                {job.company.charAt(0).toUpperCase()}

                            </div>

                            <span
                                className={`status-badge ${job.status.toLowerCase()}`}
                            >

                                {job.status}

                            </span>

                        </div>

                        <h2>{job.company}</h2>

                        <p>{job.role}</p>

                        <span className="job-date">

                            📅 {new Date(job.createdAt).toLocaleDateString()}

                        </span>

                        <div className="job-actions">

                            <button

                                className="view-btn"

                                onClick={() =>
                                    navigate(`/job/${job.id}`)
                                }

                            >

                                View Details

                            </button>

                            <button

                                className="edit-btn"

                                onClick={() => editJob(job)}

                            >

                                Edit

                            </button>

                            <button

                                className="delete-btn"

                                onClick={() => deleteJob(job)}

                            >

                                🗑

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default JobList;