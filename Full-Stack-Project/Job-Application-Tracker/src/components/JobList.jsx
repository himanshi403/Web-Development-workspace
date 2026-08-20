import { useNavigate } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo";

function JobList({
    jobs = [],
    deleteJob,
    editJob,
    setShowForm
}) {

    const navigate = useNavigate();


    // Works with MongoDB _id and older frontend id
    const getJobId = (job) => {

        return job._id || job.id;

    };


    // No jobs returned from backend
    if (jobs.length === 0) {

        return (

            <div className="empty-state">

                <h2>
                    📄 No Jobs Found
                </h2>

                <p>
                    Try changing your search or filters,
                    or add a new job application.
                </p>

                <button
                    className="add-first-job-btn"
                    onClick={() => setShowForm(true)}
                >
                    + Add Job
                </button>

            </div>

        );

    }


    return (

        <div className="jobs-grid">

            {

                jobs.map((job) => {

                    const jobId = getJobId(job);

                    return (

                        <div
                            className="job-card"
                            key={jobId}
                        >

                            <div className="job-top">

                                <CompanyLogo
    company={job.company}
    size="normal"
/>


                                <span
                                    className={`status-badge ${
                                        (job.status || "Applied")
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

                                {

                                    job.createdAt

                                        ?

                                        new Date(
                                            job.createdAt
                                        ).toLocaleDateString()

                                        :

                                        "Not Available"

                                }

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

                })

            }

        </div>

    );

}

export default JobList;