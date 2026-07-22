function JobList({jobs}){
    if(jobs.length===0){
    return
        <h2>No jobs Added</h2>;
}

return(
    <div>
        {
            jobs.map((job)=>(
                <div key={job.id}>
                    <h3>{job.company}</h3>
                    <p>{job.role}</p>
                    <p>{job.status}</p>
                    </div>
            ))
        }
    </div>
);
}
export default JobList;