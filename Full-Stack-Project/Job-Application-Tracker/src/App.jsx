import {useState} from "react";
import {useEffect} from "react";

import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App(){
  const[jobs,setJobs]=useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const[sortBy,setSortBy]=useState("newest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm,setShowForm]=useState(false);
  const [jobToDelete,setJobToDelete]=useState(null);
  const[toast,setToast]=useState("");
   const [search,setSearch]=useState("");
   const [lastDeletedJob,setLastDeletedJob]=useState(null);
   const [undoTimer, setUndoTimer] = useState(null);





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

 

  function addJob(job){
    setJobs([...jobs,job]);
    showToast("✅ Job added successfully");
    setShowForm(false);
  }


function confirmDelete(){
  setLastDeletedJob(jobToDelete);

setJobs(

jobs.filter(

job=>job.id!==jobToDelete.id

)

);
setJobToDelete(null);
showToast("🗑 Job deleted successfully");
const timer=setTimeout(()=>{
  setLastDeletedJob(null);
  setToast("");
},5000);

setUndoTimer(timer);

}

function undoDelete(){
  if(lastDeletedJob){
    setJobs([...jobs,lastDeletedJob]);
    clearTimeout(undoTimer);
    setLastDeletedJob(null);
    setToast("");
  }
}

function editJob(job){

setEditingJob(job);
setShowForm(true);

}

function updateJob(updatedJob){

setJobs(

jobs.map(job=>

job.id===updatedJob.id?updatedJob:job

)

);
showToast("✏️ Job updated successfully");

setEditingJob(null);
setShowForm(false);

}

function showToast(message){
  setToast(message);//will show job added succesfully!
  setTimeout(()=>{
    setToast("");
  },3000)
}


  return(

<BrowserRouter>

<Routes>

<Route

path="/"

element={<Landing/>}

/>

<Route

path="/login"

element={<Login/>}

/>

<Route

path="/signup"

element={<SignUp/>}

/>

<Route
path="/profile"
element={<Profile />}
/>

<Route
path="/settings"
element={<Settings />}
/>

<Route

path="/dashboard"

element={

<Dashboard

jobs={jobs}

search={search}

setSearch={setSearch}

sortBy={sortBy}

setSortBy={setSortBy}

statusFilter={statusFilter}

setStatusFilter={setStatusFilter}

showForm={showForm}

setShowForm={setShowForm}

editingJob={editingJob}

jobToDelete={jobToDelete}
lastDeletedJob={lastDeletedJob}

undoDelete={undoDelete}

toast={toast}

addJob={addJob}

deleteJob={(job) => setJobToDelete(job)}

confirmDelete={confirmDelete}

editJob={editJob}

updateJob={updateJob}

setJobToDelete={setJobToDelete}

closeToast={()=>setToast("")}

/>

}


/>

</Routes>

</BrowserRouter>

);
} 

export default App;