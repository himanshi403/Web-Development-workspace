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

<div className="job-details-page">

<button
className="back-btn"
onClick={() => navigate("/dashboard")}
>

← Back to Dashboard

</button>

<div className="details-card">

<div className="details-header">

<div className="company-circle">

{job.company.charAt(0).toUpperCase()}

</div>

<div>

<h1>{job.company}</h1>

<h2>{job.role}</h2>

</div>

</div>

<div className="details-grid">

<div className="detail-item">

<h4>Status</h4>

<p>{job.status}</p>

</div>

<div className="detail-item">

<h4>Applied On</h4>

<p>

{

job.createdAt

? new Date(job.createdAt).toLocaleDateString()

: "Not Available"

}

</p>

</div>

<div className="detail-item">

<h4>Job ID</h4>

<p>{job.id}</p>

</div>

<div className="detail-item">

<h4>Notes</h4>

<p>No notes added yet.</p>

</div>

</div>

<div className="details-buttons">

<button className="edit-btn">

✏ Edit Job

</button>

</div>

<div className="job-navigation">

{

previousJob &&

<button

onClick={() =>

navigate(`/job/${previousJob.id}`)

}

>

← Previous

</button>

}

{

nextJob &&

<button

onClick={() =>

navigate(`/job/${nextJob.id}`)

}

>

Next →

</button>

}

</div>

</div>

</div>

);

}

export default JobDetails;