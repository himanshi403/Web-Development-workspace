import {useMemo} from "react";
import "../styles/Analytics.css";


function Analytics({jobs}){
    const total=jobs.length;
    const applied=jobs.filter(job=>job.status==="Applied").length;
    const interview=jobs.filter(job=>job.status==="Interview").length;
    const offer=jobs.filter(job=>job.status==="Offer").length;
    const rejected=jobs.filter(job=>job.status==="Rejected").length;

    const successRate=
    total===0? 0:Math.round((offer/total)*100);

    return(
        
        <div className="analytics-page">
            <h1>Analytics</h1>
            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>Total Applications</h3>
                    <h2>{total}</h2>

                </div>
                 <div className="analytics-card">
                    <h3>Success Rate</h3>
                    <h2>{successRate}%</h2>
                </div>
                 <div className="analytics-card">
                    <h3>Applied</h3>
                    <h2>{applied}</h2>
                </div>
                 <div className="analytics-card">
                    <h3>Interviews</h3>
                    <h2>{interview}</h2>
                </div>
                <div className="analytics-card">
                    <h3>Offers</h3>
                    <h2>{offer}</h2>
                </div>
               
                <div
                className="analytics-card">
                    <h3>Rejected</h3>
                    <h2>{rejected}</h2>
                </div>

            </div>


        </div>
    );

    
}
   
export default Analytics;