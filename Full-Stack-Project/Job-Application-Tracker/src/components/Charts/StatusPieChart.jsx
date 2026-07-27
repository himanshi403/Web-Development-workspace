import{
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function StatusPieChart({jobs}){
     const data = [
    {
      name: "Applied",
      value: jobs.filter(job => job.status === "Applied").length
    },
    {
      name: "Interview",
      value: jobs.filter(job => job.status === "Interview").length
    },
    {
      name: "Offer",
      value: jobs.filter(job => job.status === "Offer").length
    },
    {
      name: "Rejected",
      value: jobs.filter(job => job.status === "Rejected").length
    }
  ];

   const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#22C55E",
    "#EF4444"
  ];

  return(
     <div className="chart-card">

      <h2>Applications by Status</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
          >

            {
              data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
export default StatusPieChart;