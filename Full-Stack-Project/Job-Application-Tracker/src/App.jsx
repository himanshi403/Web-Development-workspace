import {useState} from "react";
import {useEffect} from "react";
import Analytics from "./pages/Analytics";
import JobDetails from "./pages/JobDetails";
import Resume from "./pages/Resume";
import InterviewCalendar from "./pages/InterviewCalendar";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
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

import {
    getJobs,
    createJob,
    updateJob as updateJobAPI,
    deleteJob as deleteJobAPI
} from "./services/jobService";

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

  const fetchJobs=async ()=>{
    try{
      const response=await getJobs();
      setJobs(response.data.jobs);
    }catch(error){
      console.error("Error fetching jobs:",error);
    }
  };

  useEffect(()=>{
    fetchJobs();
  },[]);


  

 

const addJob = async (jobData) => {

    try {

        await createJob(jobData);

        await fetchJobs();

        showToast("✅ Job added successfully");

        addActivity(`Added ${jobData.company}`);

        setShowForm(false);

    }

    catch (error) {

        console.log(error);

        showToast("❌ Failed to add job");

    }

};


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

const updateJob = async (updatedJob) => {

    try {

        await updateJobAPI(updatedJob.id, updatedJob);

        await fetchJobs();

        showToast("✏️ Job updated successfully");

        addActivity(`Updated ${updatedJob.company}`);

        setEditingJob(null);

        setShowForm(false);

    }

    catch (error) {

        console.log(error);

        showToast("❌ Update failed");

    }

};

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
function exportJobs() {

    const data = JSON.stringify(jobs, null, 2);

    const blob = new Blob(
        [data],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "jobs.json";

    link.click();

}

  return(
    <ErrorBoundary>


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
path="/resume"
element={<Resume/>}
/>

<Route
path="/calendar"
element={<InterviewCalendar jobs={jobs}/>}
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
    path="*"
    element={<NotFound/>}
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
exportJobs={exportJobs}


/>



}



/>
<Route
    path="/job/:id"
    element={
        <JobDetails
            jobs={jobs}
            updateJob={updateJob}
        />
    }
/>

</Routes>

</BrowserRouter>
</ErrorBoundary>

);
} 

export default App;