import {useState} from "react";
import {useEffect} from "react";

import Navbar from "./components/Navbar";
import JobForm from "./components/JobForm";
import JobStats from "./components/JobStats";
import JobList from "./components/JobList";

function App(){
  const[jobs,setJobs]=useState([]);
  const [editingJob, setEditingJob] = useState(null);

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
  <Navbar 
     search={search}
     setSearch={setSearch}
  />
  <JobForm 
  addJob={addJob}
  editingJob={editingJob}
  updateJob={updateJob}
  />
  <JobStats jobs={jobs} />
  <JobList jobs={jobs}
           deleteJob={deleteJob}
           editJob={editJob}
           search={search}
   />
  </div>
  );
} 

export default App;