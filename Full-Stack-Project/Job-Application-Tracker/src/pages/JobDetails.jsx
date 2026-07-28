import { useParams, useNavigate } from "react-router-dom";

function JobDetails({ jobs }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const job = jobs.find(
        job => job.id.toString() === id
    );

    if (!job) {
        return <h2>Job Not Found</h2>;
    }

    const sortedJobs = [...jobs].reverse();
    const currentIndex = sortedJobs.findIndex(
        j => j.id.toString() === id
    );

    const previousJob =
        currentIndex > 0
            ? sortedJobs[currentIndex - 1]
            : null;

    const nextJob =
        currentIndex < sortedJobs.length - 1
            ? sortedJobs[currentIndex + 1]
            : null;

    return (

        <div className="details-page">

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                ← Back
            </button>

            <h1>{job.company}</h1>

            <h2>{job.role}</h2>

            <p>
                <strong>Status:</strong> {job.status}
            </p>

            <p>
                <strong>Applied On:</strong>{" "}
                {
                    job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "Not Available"
                }
            </p>

            <p>
                <strong>Job ID:</strong> {job.id}
            </p>

            <p>
                <strong>Notes:</strong> No notes added yet.
            </p>

            <button className="edit-btn">
                Edit Job
            </button>

            <div className="job-navigation">

                {
                    previousJob && (

                        <button
                            onClick={() =>
                                navigate(`/job/${previousJob.id}`)
                            }
                        >
                            ← Previous
                        </button>

                    )
                }

                {
                    nextJob && (

                        <button
                            onClick={() =>
                                navigate(`/job/${nextJob.id}`)
                            }
                        >
                            Next →
                        </button>

                    )
                }

            </div>

        </div>

    );

}

export default JobDetails;