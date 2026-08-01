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

closeForm
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

   <header className="dashboard-header">

<div>

<h1>

Welcome back, Himanshi 👋

</h1>

<p>

Keep tracking your applications and stay one step closer to your dream offer.

</p>

</div>

<div className="dashboard-summary">

<h2>

{jobs.length}

</h2>

<span>

Applications

</span>

</div>

</header>
<QuickActions
    setShowForm={setShowForm}
    
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