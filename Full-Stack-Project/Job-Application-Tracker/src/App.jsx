import {useState} from "react";
import {useEffect} from "react";
import Analytics from "./pages/Analytics";
import JobDetails from "./pages/JobDetails";
import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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
   const [activities, setActivities] = useState([]);



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
    addActivity(`Added ${job.company}`);
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
addActivity(`Deleted ${jobToDelete.company}`);
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
addActivity(`Updated ${updatedJob.company}`);

setEditingJob(null);
setShowForm(false);

}

function showToast(message){
  setToast(message);//will show job added succesfully!
  setTimeout(()=>{
    setToast("");
  },3000)
}
function addActivity(text) {
  setActivities(prev => [
    {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    },
    ...prev
  ]);
}
function closeJobForm(){

setShowForm(false);

setEditingJob(null);

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
element={<Profile jobs={jobs}/>}
/>

<Route
path="/settings"
element={<Settings jobs={jobs}/>}
/>

<Route
path="/analytics"
element={<Analytics jobs={jobs}/>}
/>

<Route

path="/dashboard"

element={

<Dashboard

jobs={jobs}
activities={activities}

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
closeForm={closeJobForm}


/>


}



/>
<Route
    path="/job/:id"
    element={
        <JobDetails
            jobs={jobs}
        />
    }
/>

</Routes>

</BrowserRouter>

);
} 

export default App;