function JobList({
jobs,
deleteJob,
editJob,
search,
sortBy,
statusFilter
})


{
const filteredJobs=

jobs.filter(job=>{
const matchesSearch=job.company
.toLowerCase().includes(search.toLowerCase());

const matchesStatus=statusFilter==="All"||job.status===statusFilter;

return matchesSearch && matchesStatus
;
})

.sort((a,b)=>{
    if(sortBy==="newest"){
        return b.id-a.id;
    }

    if(sortBy==="oldest"){
        return a.id-b.id;
    }
    if(sortBy==="az"){
        return a.company.localeCompare(b.company);
    }

    if(sortBy==="za"){
        return b.company.localeCompare(a.company);
    }

    if(sortBy==="status"){
        return a.status.localeCompare(b.status);
    }
    return 0;
});

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