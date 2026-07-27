import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function TopCompaniesChart({ jobs }) {

    const companyMap = {};

    jobs.forEach(job => {

        companyMap[job.company] =
            (companyMap[job.company] || 0) + 1;

    });

    const data = Object.entries(companyMap)
        .map(([company, count]) => ({
            company,
            count
        }))
        .sort((a, b) => b.count - a.count);

            return (

        <div className="chart-card">

            <h2>Top Companies</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>

                    <XAxis dataKey="company" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#2563eb"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopCompaniesChart;