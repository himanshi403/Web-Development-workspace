function RecentJobs({ jobs }) {

    const recentJobs = [...jobs]

        .sort((a, b) => b.id - a.id)

        .slice(0, 3);

    return (

        <div className="recent-jobs">

            <h2>Recent Applications</h2>

            {

                recentJobs.map(job => (

                    <div

                        key={job.id}

                        className="recent-job-card"

                    >

                        <h3>{job.company}</h3>

                        <p>{job.role}</p>

                        <span>{job.status}</span>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentJobs;