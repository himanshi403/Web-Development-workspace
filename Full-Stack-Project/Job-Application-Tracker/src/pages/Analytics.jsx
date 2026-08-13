import { useEffect, useState } from "react";

import StatusPieChart from "../components/Charts/StatusPieChart";
import TopCompaniesChart from "../components/Charts/TopCompaniesChart";
import MonthlyTrendChart from "../components/Charts/MonthlyTrendChart";
import Layout from "../components/Layout";

import { getJobStats } from "../services/jobService";


function Analytics({ jobs = [] }) {

    const [stats, setStats] = useState({
        Applied: 0,
        Interview: 0,
        Offer: 0,
        Rejected: 0
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchStats = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await getJobStats();

                console.log(
                    "Analytics API response:",
                    response.data
                );


                const backendStats =
                    response.data.stats || [];


                const formattedStats = {
                    Applied: 0,
                    Interview: 0,
                    Offer: 0,
                    Rejected: 0
                };


                if (Array.isArray(backendStats)) {

                    backendStats.forEach(item => {

                        if (
                            item._id &&
                            formattedStats.hasOwnProperty(item._id)
                        ) {

                            formattedStats[item._id] =
                                item.count || 0;

                        }

                    });

                } else {

                    formattedStats.Applied =
                        backendStats.Applied ||
                        backendStats.applied ||
                        0;

                    formattedStats.Interview =
                        backendStats.Interview ||
                        backendStats.interview ||
                        0;

                    formattedStats.Offer =
                        backendStats.Offer ||
                        backendStats.offer ||
                        0;

                    formattedStats.Rejected =
                        backendStats.Rejected ||
                        backendStats.rejected ||
                        0;

                }


                setStats(formattedStats);


            } catch (error) {

                console.error(
                    "Error fetching job statistics:",
                    error
                );

                setError(
                    "Failed to load analytics."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchStats();


    }, []);


    const total =
        stats.Applied +
        stats.Interview +
        stats.Offer +
        stats.Rejected;


    const successRate =
        total === 0
            ? 0
            : Math.round(
                (stats.Offer / total) * 100
            );


    if (loading) {

        return (

            <Layout>

                <div className="analytics-page">

                    <h1>Analytics</h1>

                    <p>
                        Loading analytics...
                    </p>

                </div>

            </Layout>

        );

    }


    if (error) {

        return (

            <Layout>

                <div className="analytics-page">

                    <h1>Analytics</h1>

                    <p>{error}</p>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="analytics-page">

                <h1>Analytics</h1>


                <div className="analytics-grid">


                    <div className="analytics-card">

                        <h3>
                            Total Applications
                        </h3>

                        <h2>
                            {total}
                        </h2>

                    </div>


                    <div className="analytics-card">

                        <h3>
                            Success Rate
                        </h3>

                        <h2>
                            {successRate}%
                        </h2>

                    </div>


                    <div className="analytics-card">

                        <h3>
                            Applied
                        </h3>

                        <h2>
                            {stats.Applied}
                        </h2>

                    </div>


                    <div className="analytics-card">

                        <h3>
                            Interviews
                        </h3>

                        <h2>
                            {stats.Interview}
                        </h2>

                    </div>


                    <div className="analytics-card">

                        <h3>
                            Offers
                        </h3>

                        <h2>
                            {stats.Offer}
                        </h2>

                    </div>


                    <div className="analytics-card">

                        <h3>
                            Rejected
                        </h3>

                        <h2>
                            {stats.Rejected}
                        </h2>

                    </div>


                </div>


                <StatusPieChart
                    jobs={jobs}
                />

                <TopCompaniesChart
                    jobs={jobs}
                />

                <MonthlyTrendChart
                    jobs={jobs}
                />

            </div>

        </Layout>

    );

}


export default Analytics;