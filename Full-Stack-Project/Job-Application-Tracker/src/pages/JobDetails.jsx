import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";

function JobDetails({ jobs,updateJob }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const job = jobs.find(
        job => job.id.toString() === id
    );
    const [editing,setEditing] = useState(false);

const [company,setCompany] = useState(job.company);

const [role,setRole] = useState(job.role);

const [status,setStatus] = useState(job.status);

const [notes,setNotes] = useState(job.notes || "");

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
    <Layout>

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

{
editing ?

<>

<input

value={company}

onChange={(e)=>setCompany(e.target.value)}

/>

<input

value={role}

onChange={(e)=>setRole(e.target.value)}

/>

</>

:

<>

<h1>{job.company}</h1>

<h2>{job.role}</h2>

</>

}

</div>

</div>

<div className="details-grid">

<div className="detail-item">

<h4>Status</h4>

{
editing ?

<select

value={status}

onChange={(e)=>setStatus(e.target.value)}
>

<option>Applied</option>

<option>Interview</option>

<option>Offer</option>

<option>Rejected</option>

</select>

:

<p>{job.status}</p>

}

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

{

editing ?

<textarea

value={notes}

onChange={(e)=>setNotes(e.target.value)}

/>

:

<p>

{job.notes || "No notes added yet."}

</p>

}

</div>

</div>

<div className="details-buttons">

{

editing ?

<>

<button

className="save-btn"

onClick={()=>{

updateJob({

...job,

company,

role,

status,

notes

});

setEditing(false);

}}

>

Save

</button>

<button

className="cancel-btn"

onClick={()=>{

setEditing(false);

}}

>

Cancel

</button>

</>

:

<button

className="edit-btn"

onClick={()=>setEditing(true)}

>

Edit Job

</button>

}

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
</Layout>

);

}

export default JobDetails;