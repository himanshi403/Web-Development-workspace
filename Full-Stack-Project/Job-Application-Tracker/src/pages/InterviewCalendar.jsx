import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function InterviewCalendar({ jobs = [] }) {

    const navigate = useNavigate();


    const interviewJobs = jobs
        .filter(job => job.interviewDate)
        .sort(
            (a, b) =>
                new Date(a.interviewDate) -
                new Date(b.interviewDate)
        );

    function formatDate(date) {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const upcomingInterviews = interviewJobs.filter(job => {

        const interviewDate = new Date(
            job.interviewDate
        );

        interviewDate.setHours(0, 0, 0, 0);

        return interviewDate >= today;

    });


    const pastInterviews = interviewJobs.filter(job => {

        const interviewDate = new Date(
            job.interviewDate
        );

        interviewDate.setHours(0, 0, 0, 0);

        return interviewDate < today;

    });


    function tileContent({ date, view }) {

        // Only show interview counts on the monthly calendar
        if (view !== "month") {
            return null;
        }

        const currentDate = formatDate(date);


        const interviews = interviewJobs.filter(job => {

            const interviewDate = formatDate(
                new Date(job.interviewDate)
            );

            return interviewDate === currentDate;

        });


        if (interviews.length === 0) {
            return null;
        }


        return (

            <div className="calendar-dot">

                {interviews.length}

            </div>

        );

    }


    function displayDate(date) {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }



    function InterviewCard({ job }) {

        return (

            <div
                className="calendar-card"
                key={job._id || job.id}
                onClick={() =>
                    navigate(
                        `/job/${job._id || job.id}`
                    )
                }
            >

                <div>

                    <h3>
                        {job.company}
                    </h3>

                    <p>
                        {job.role}
                    </p>

                </div>


                <span>

                    📅{" "}

                    {displayDate(job.interviewDate)}

                </span>

            </div>

        );

    }


    return (

        <Layout>

            <div className="calendar-page">

                <h1>
                    Interview Calendar
                </h1>

                <p>
                    Track all your scheduled interviews.
                </p>


                <Calendar
                    tileContent={tileContent}
                />

                <div className="calendar-list">

                    <h2>
                        Upcoming Interviews
                    </h2>


                    {

                        upcomingInterviews.length === 0

                            ?

                            (

                                <div className="empty-state">

                                    <h3>
                                        📅 No Upcoming Interviews
                                    </h3>

                                    <p>
                                        Add an interview date to a job
                                        application to see it here.
                                    </p>

                                </div>

                            )

                            :

                            (

                                upcomingInterviews.map(job => (

                                    <InterviewCard
                                        key={job._id || job.id}
                                        job={job}
                                    />

                                ))

                            )

                    }

                </div>


                {

                    pastInterviews.length > 0 && (

                        <div className="calendar-list past-interviews">

                            <h2>
                                Past Interviews
                            </h2>


                            {

                                pastInterviews.map(job => (

                                    <InterviewCard
                                        key={job._id || job.id}
                                        job={job}
                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </Layout>

    );

}

export default InterviewCalendar;