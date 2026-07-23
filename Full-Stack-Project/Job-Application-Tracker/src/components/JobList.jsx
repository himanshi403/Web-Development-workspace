function JobList({
jobs,
deleteJob,
editJob,
search
})


{
const filteredJobs=

jobs.filter(job=>job.company
.toLowerCase().includes(search.toLowerCase())

);

if(filteredJobs.length===0){

return(

<h2>

No matching jobs found

</h2>

);

}

return(

<div>
{ filteredJobs.map((job)=>(
    <div className="job-card" key={job.id}>
    <h3>{job.company}</h3>
    <p>{job.role}</p>
    <p className={`status ${job.status.toLowerCase()}`}>{job.status}</p>

<button onClick={()=>deleteJob(job.id)}>Delete</button>

<button onClick={()=>editJob(job)}>Edit</button>

</div>
                    
 ))}
    </div>
);
}
export default JobList;