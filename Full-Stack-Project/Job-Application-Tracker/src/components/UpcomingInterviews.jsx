function UpcomingInterviews({ jobs }){
    const interviews=jobs.filter(
        job=>
            job.status==="Interview" &&
            job.interviewDate
    );

    return(
        <div className="upcoming-card">
            <h2>
                📅 Upcoming Interviews
            </h2>
            {
                interviews.length===0
                ?
                <p>No Upcoming interviews</p>
                :
                interviews.map(job=>(
                    <div
                    key={job.id}
                    className="interview-item">
                        <strong> 
                            {job.company}
                        </strong>
                            <p>
                                {job.interviewDate}
                            </p>
                            </div>
                       
                ))
            }
        </div>
    );
}

export default UpcomingInterviews;