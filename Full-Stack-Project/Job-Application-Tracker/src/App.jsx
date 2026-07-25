import {useState} from "react";
import {useEffect} from "react";

import Navbar from "./components/Navbar";
import JobForm from "./components/JobForm";
import JobStats from "./components/JobStats";
import JobList from "./components/JobList";

function App(){
  const[jobs,setJobs]=useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const[sortBy,setSortBy]=useState("newest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm,setShowForm]=useState(false);
  const [jobToDelete,setJobToDelete]=useState(null);

useEffect(() => {

const savedJobs = JSON.parse(localStorage.getItem("jobs"));

if(savedJobs!==null){

setJobs(savedJobs);

}

},[]);

    useEffect(()=>{
    localStorage.setItem(
      "jobs",
      JSON.stringify(jobs)
    );
  },[jobs]);

  const [search,setSearch]=useState("");

  function addJob(job){
    setJobs([...jobs,job]);
  }
  function deleteJob(id){
    setJobs(
      jobs.filter(job=>job.id!==id)
    );
  }

  function confirmDelete(){

setJobs(

jobs.filter(

job=>job.id!==jobToDelete.id

)

);

setJobToDelete(null);

}

  function editJob(job){

setEditingJob(job);

}

function updateJob(updatedJob){

setJobs(

jobs.map(job=>

job.id===updatedJob.id?updatedJob:job

)

);

setEditingJob(null);

}


  return(
  <div>
    <header className="dashboard-header">

<h1>Job Application Tracker</h1>

<p>

Track every application,

interview and offer in one place.

</p>

</header>
<button
onClick={()=>setShowForm(!showForm)}
className="toggle-btn"
>

{showForm ? "Close Form" : "+ Add New Job"}

</button>
  <Navbar 
     search={search}
     setSearch={setSearch}
     sortBy={sortBy}
     setSortBy={setSortBy}
     statusFilter={statusFilter}setStatusFilter={setStatusFilter}
  />

  {
showForm && (
  <JobForm 
  addJob={addJob}
  closeForm={() => setShowForm(false)}
  editingJob={editingJob}
  updateJob={updateJob}
  />
)}

  <JobStats jobs={jobs} />
  <JobList jobs={jobs}
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




  </div>
  );
} 

export default App;