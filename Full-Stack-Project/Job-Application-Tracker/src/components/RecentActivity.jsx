function RecentActivity({ activities }) {

    return (

        <div className="activity-card">

            <h2>Recent Activity</h2>

            {

                activities.length === 0 ?

                (

                    <p>No activity yet.</p>

                ) :

                (

                    activities.map(activity => (

                        <div

                            className="activity-item"

                            key={activity.id}

                        >

                            <span>

                                {activity.text}

                            </span>

                            <small>

                                {activity.time}

                            </small>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default RecentActivity;