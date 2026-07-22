import {useState} from "react";

import Navbar from "./components/Navbar";
import JobForm from "./components/JobForm";
import JobStats from "./components/JobStats";
import JobList from "./components/JobList";

function App(){
  const[jobs,setJobs]=useState([]);

  function addJob(job){
    setJobs([...jobs,job]);
  }
  return(
  <div>
  <Navbar />
  <JobForm addJob={addJob}/>
  <JobStats jobs={jobs} />
  <JobList jobs={jobs} />
  </div>
  );
} 

export default App;