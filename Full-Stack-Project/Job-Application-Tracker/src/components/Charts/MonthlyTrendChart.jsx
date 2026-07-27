import {

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

ResponsiveContainer,

CartesianGrid

} from "recharts";

function MonthlyTrendChart({ jobs }) {

const monthMap = {};

jobs.forEach(job => {

if (!job.createdAt) return;

const month = new Date(job.createdAt)

.toLocaleString(

"default",

{ month: "short" }

);

monthMap[month] =

(monthMap[month] || 0) + 1;

});

const data = Object.entries(monthMap)

.map(([month, count]) => ({

month,

count

}));

return (

<div className="chart-card">

<h2>Monthly Applications</h2>

<ResponsiveContainer

width="100%"

height={350}

>

<LineChart data={data}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="month" />

<YAxis />

<Tooltip />

<Line

type="monotone"

dataKey="count"

stroke="#2563eb"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

);

}

export default MonthlyTrendChart;