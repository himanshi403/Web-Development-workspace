import { useState } from "react";

function NotificationBell({ activities = [] }) {

    const [showNotifications, setShowNotifications] = useState(false);

    return (

        <div className="notification-wrapper">

            <div
                className="notification-bell"
                onClick={() => setShowNotifications(!showNotifications)}
            >

                🔔

                {
                    activities.length > 0 &&

                    <span className="notification-count">

                        {activities.length}

                    </span>

                }

            </div>

            {
                showNotifications &&

                <div className="notification-dropdown">

                    <h3>Notifications</h3>

                    {
                        activities.length === 0 ?

                            <p className="empty-notification">

                                No notifications yet.

                            </p>

                            :

                            activities.map(activity => (

                                <div
                                    key={activity.id}
                                    className="notification-item"
                                >

                                    <p>{activity.text}</p>

                                    <small>{activity.time}</small>

                                </div>

                            ))

                    }

                </div>

            }

        </div>

    );

}

export default NotificationBell;