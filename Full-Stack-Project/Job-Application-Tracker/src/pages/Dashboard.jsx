
import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import JobStats from "../components/JobStats";
import JobList from "../components/JobList";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import RecentJobs from "../components/RecentJobs";
import QuickActions from "../components/QuickActions";



function Dashboard({

jobs,

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

undoDelete})

{
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

    

  return (
    

    
      <div className="dashboard-layout">

    <Sidebar />

    <div className="dashboard-content">

    <header className="dashboard-header">

<h1>Job Application Tracker</h1>

<p>

Track every application,

interview and offer in one place.

</p>

</header>
<QuickActions
    setShowForm={setShowForm}
/>
<button
onClick={()=>setShowForm(!showForm)}
className="toggle-btn"
>

{showForm ? "Close Form" : "+ Add New Job"}

</button>
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
  <JobForm
    addJob={addJob}
    closeForm={() => setShowForm(false)}
    editingJob={editingJob}
    updateJob={updateJob}
  />
)}

  <JobStats jobs={jobs} />
  
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
   />


  {
jobToDelete && (

<div className="modal-overlay">

<div className="modal">

<h2>Delete Job?</h2>

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