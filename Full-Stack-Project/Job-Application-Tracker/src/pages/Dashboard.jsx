import React, {useState,useEffect} from 'react';


import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import JobStats from "../components/JobStats";
import JobList from "../components/JobList";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import RecentJobs from "../components/RecentJobs";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import NotificationBell from "../components/NotificationBell";
import ProfileMenu from "../components/ProfileMenu";
import UpcomingInterviews from "../components/UpcomingInterviews";




function Dashboard({

jobs,
activities,

search,
setSearch,

sortBy,
setSortBy,

statusFilter,
setStatusFilter,

showForm,
setShowForm,

editingJob,

jobToDelete,
toast,

lastDeletedJob,

addJob,

editJob,

updateJob,

setJobToDelete,

confirmDelete,

undoDelete,

closeForm,
exportJobs
})

{
    const [loading, setLoading] = useState(true);
  
  const filteredJobs = jobs
.filter(job => {

const matchSearch = job.company
.toLowerCase()
.includes(search.toLowerCase());

const matchStatus =

statusFilter === "All" ||

job.status === statusFilter;

return matchSearch && matchStatus;

});
useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    },1000);

    return () => clearTimeout(timer);

},[]);


const words = [
  "Track",
  "Apply",
  "Achieve",
  "Grow",
  "Succeed"
];

const [currentWord, setCurrentWord] = useState(0);

useEffect(() => {

  const interval = setInterval(() => {

    setCurrentWord(prev => (prev + 1) % words.length);

  },2500);

  return () => clearInterval(interval);

},[]);

if(loading){

    return(

        <div className="loading-screen">

            <div className="loader"></div>

            <p>Loading Dashboard...</p>

        </div>

    );

}

    

  return (
    

    
      <div className="dashboard-layout">

    <Sidebar />

    <div className="dashboard-content">
      <div className="dashboard-topbar">

<NotificationBell activities={activities}/>

<ProfileMenu/>

</div>
<header className="dashboard-hero">

<div className="hero-left">

<h1 className="hero-title">

<span className="hero-static">Track&nbsp;</span>

<span className="hero-word">

{["Dreams", "Jobs", "Success", "Offers", "Future"][Math.floor(Date.now()/2500)%5]}

</span>

</h1>

<p className="hero-subtitle">

Welcome back, <strong>Himanshi</strong> 👋

<br />

Keep tracking your applications and stay one step closer to your dream offer.

</p>

</div>

<div className="hero-right">

<div className="hero-stat-card">

<div className="hero-stat-number">

{jobs.length}

</div>

<div className="hero-stat-label">

Applications

</div>

</div>

</div>

</header>
<QuickActions
    setShowForm={setShowForm}
    exportJobs={exportJobs}
    
/>

<div className="toolbar">

  <div className="toolbar-left">

    <Navbar
      search={search}
      setSearch={setSearch}
      sortBy={sortBy}
      setSortBy={setSortBy}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
    />

  </div>

  <div className="toolbar-right">

    <button
      onClick={() => setShowForm(!showForm)}
      className="toolbar-add-btn"
    >
      {showForm ? "Close Form" : "+ Add Job"}
    </button>

  </div>

</div>

{showForm && (
  <div
className="modal-overlay"
onClick={closeForm}
>

<div
className="job-modal"
onClick={(e)=>e.stopPropagation()}
>
  <JobForm
    addJob={addJob}
    closeForm={closeForm}
    editingJob={editingJob}
    updateJob={updateJob}
    
  />
  </div>
  </div>
)}

  <JobStats jobs={jobs} />
  <UpcomingInterviews jobs={jobs}/>
  
  <RecentActivity activities={activities} />
  
  <RecentJobs jobs={jobs}/>
<p className="results-info">
  Showing {filteredJobs.length} of {jobs.length} applications
</p>

  <JobList jobs={filteredJobs}
           deleteJob={(job)=>setJobToDelete(job)}
           editJob={editJob}
           search={search}
           sortBy={sortBy}
           statusFilter={statusFilter}
           setShowForm={setShowForm}
   />


  {
jobToDelete && (

<div className="modal-overlay">

<div className="modal">

<h2>🗑 Delete Application</h2>

<p>

Are you sure you want to delete

<strong> {jobToDelete.company} </strong>

?

</p>

<p>

Role :

{jobToDelete.role}

</p>

<div className="modal-buttons">

<button

onClick={()=>setJobToDelete(null)}

>

Cancel

</button>

<button

onClick={confirmDelete}

>

Delete

</button>

</div>

</div>

</div>

)
}


{
toast && (

<div className="toast">

<span>{toast}</span>

{

lastDeletedJob && (

<button

onClick={undoDelete}

>

Undo

</button>

)

}

</div>

)
}


</div>

  </div>
    

  );

}

export default Dashboard;