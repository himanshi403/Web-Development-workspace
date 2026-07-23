function Stats({jobs}){

    return(

     <div className="stats">

    <div className="stat-card">
        <h3>Total</h3>
        <p>{jobs.length}</p>
    </div>

    <div className="stat-card">
        <h3>Applied</h3>
        <p>
            {jobs.filter(job => job.status === "Applied").length}
        </p>
    </div>

    <div className="stat-card">
        <h3>Interview</h3>
        <p>
            {jobs.filter(job => job.status === "Interview").length}
        </p>
    </div>

    <div className="stat-card">
        <h3>Offer</h3>
        <p>
            {jobs.filter(job => job.status === "Offer").length}
        </p>
    </div>

    <div className="stat-card">
        <h3>Rejected</h3>
        <p>
            {jobs.filter(job => job.status === "Rejected").length}
        </p>
    </div>

</div>

    );

}

export default Stats;