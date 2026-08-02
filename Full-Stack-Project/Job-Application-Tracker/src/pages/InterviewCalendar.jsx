import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function InterviewCalendar({ jobs }) {

const interviewJobs = jobs.filter(

job => job.interviewDate

);

function tileContent({ date }) {

const year = date.getFullYear();

const month = String(date.getMonth()+1).padStart(2,"0");

const day = String(date.getDate()).padStart(2,"0");

const today = `${year}-${month}-${day}`;

const interviews = interviewJobs.filter(

job => job.interviewDate === today

);

if(interviews.length===0){

return null;

}

return(

<div className="calendar-dot">

{interviews.length}

</div>

);

}

return(

<Layout>

<div className="calendar-page">

<h1>

Interview Calendar

</h1>

<p>

All scheduled interviews

</p>

<Calendar

tileContent={tileContent}

/>

<div className="calendar-list">

<h2>

Upcoming Interviews

</h2>

{

interviewJobs.length===0 ?

<p>

No Interviews Scheduled

</p>

:

interviewJobs.map(job=>(

<div
className="calendar-card"
key={job.id}
>

<h3>

{job.company}

</h3>

<p>

{job.role}

</p>

<span>

📅 {job.interviewDate}

</span>

</div>

))

}

</div>

</div>

</Layout>

);

}

export default InterviewCalendar;