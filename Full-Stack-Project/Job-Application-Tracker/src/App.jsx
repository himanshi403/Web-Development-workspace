import {useState} from "react";

import Navbar from "./components/Navbar";
import JobForm from "./components/JobForm";
import JobStats from "./components/JobStats";
import JobList from "./components/JobList";

function App(){
  const[jobs,setJobs]=useState([]);
  const [search,setSearch]=useState("");

  function addJob(job){
    setJobs([...jobs,job]);
  }
  function deleteJob(id){
    setJobs(
      jobs.filter(job=>job.id!==id)
    );
  }
  return(
  <div>
  <Navbar 
     search={search}
     setSearch={setSearch}
  />
  <JobForm addJob={addJob}/>
  <JobStats jobs={jobs} />
  <JobList jobs={jobs}
           deleteJob={deleteJob}
           search={search}
   />
  </div>
  );
} 

export default App;