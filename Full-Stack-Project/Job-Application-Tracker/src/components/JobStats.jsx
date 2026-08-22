function Stats({ jobs }) {

    console.log("JobStats received:", jobs);
    console.log("Jobs length:", jobs?.length);

    return (

        <div className="stats">

            <div className="stat-card">

                <h3>📄 Total Applications</h3>

                <h1>{jobs.length}</h1>

                <small>All tracked jobs</small>

            </div>

            <div className="stat-card">

                <h3>📝 Applied</h3>

                <h1>
                    {
                        jobs.filter(
                            job => job.status === "Applied"
                        ).length
                    }
                </h1>

                <small>Waiting for response</small>

            </div>

            <div className="stat-card">

                <h3>💼 Interview</h3>

                <h1>
                    {
                        jobs.filter(
                            job => job.status === "Interview"
                        ).length
                    }
                </h1>

                <small>Interviews scheduled</small>

            </div>

            <div className="stat-card">

                <h3>🎉 Offer</h3>

                <h1>
                    {
                        jobs.filter(
                            job => job.status === "Offer"
                        ).length
                    }
                </h1>

                <small>Congratulations!</small>

            </div>

            <div className="stat-card">

                <h3>❌ Rejected</h3>

                <h1>
                    {
                        jobs.filter(
                            job => job.status === "Rejected"
                        ).length
                    }
                </h1>

                <small>Keep applying</small>

            </div>

        </div>
    );
}

export default Stats;