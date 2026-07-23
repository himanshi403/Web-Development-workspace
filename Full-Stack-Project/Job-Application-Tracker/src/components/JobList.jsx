function JobList({
jobs,
deleteJob,
search
})


{
const filteredJobs=

jobs.filter(job=>job.company
.toLowerCase().includes(search.toLowerCase())

);
return(

<div>
{ filteredJobs.map((job)=>(
    <div className="job-card" key={job.id}>
    <h3>{job.company}</h3>
    <p>{job.role}</p>
    <p>{job.status}</p>

<button onClick={()=>deleteJob(job.id)}>Delete</button>

</div>
                    
 ))}
    </div>
);
}
export default JobList;