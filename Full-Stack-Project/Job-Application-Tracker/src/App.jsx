import { useState, useEffect } from "react";

import Analytics from "./pages/Analytics";
import JobDetails from "./pages/JobDetails";
import Resume from "./pages/Resume";
import InterviewCalendar from "./pages/InterviewCalendar";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import {
    getJobs,
    createJob,
    updateJob as updateJobAPI,
    deleteJob as deleteJobAPI,
    restoreJob as restoreJobAPI
} from "./services/jobService";


function App() {

    const [jobs, setJobs] = useState([]);

    const [editingJob, setEditingJob] = useState(null);

    const [sortBy, setSortBy] = useState("newest");

    const [statusFilter, setStatusFilter] = useState("All");

    const [showForm, setShowForm] = useState(false);

    const [jobToDelete, setJobToDelete] = useState(null);

    const [toast, setToast] = useState("");

    const [search, setSearch] = useState("");

    const [lastDeletedJob, setLastDeletedJob] = useState(null);

    const [undoTimer, setUndoTimer] = useState(null);

    const [activities, setActivities] = useState([]);

    
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem("user")
    );


    
    // FETCH JOBS FOR CURRENT USER
    

    const fetchJobs = async () => {

        const token = localStorage.getItem("token");

        
        if (!token) {

            setJobs([]);

            return;

        }

        try {

            const response = await getJobs();

            setJobs(response.data.jobs || []);

        } catch (error) {

            console.error("Error fetching jobs:", error);

            
            if (error.response?.status === 401) {

                setJobs([]);

            }

        }

    };


   

    useEffect(() => {

        const handleAuthChange = () => {

            const user = localStorage.getItem("user");

            /*
             * Clear old user's jobs immediately.
             */
            setJobs([]);

            setCurrentUser(user);

            /*
             * Fetch jobs belonging to the newly logged-in user.
             */
            if (user && localStorage.getItem("token")) {

                fetchJobs();

            }

        };


        window.addEventListener(
            "authChange",
            handleAuthChange
        );


        return () => {

            window.removeEventListener(
                "authChange",
                handleAuthChange
            );

        };

    }, []);


    
    // INITIAL LOAD
    
    useEffect(() => {

        const token = localStorage.getItem("token");

        const user = localStorage.getItem("user");

        if (token && user) {

            setCurrentUser(user);

            fetchJobs();

        } else {

            setJobs([]);

        }

    }, []);


   
    // ADD JOB
    

    const addJob = async (jobData) => {

        try {

            await createJob(jobData);

            
            await fetchJobs();

            showToast("✅ Job added successfully");

            addActivity(
                `Added ${jobData.company}`
            );

            setShowForm(false);

        } catch (error) {

            console.error("Add job error:", error);

            showToast("❌ Failed to add job");

        }

    };


    // =========================================================
    // DELETE JOB
    // =========================================================

    const confirmDelete = async () => {

        if (!jobToDelete) {
            return;
        }

        try {

            await deleteJobAPI(jobToDelete._id || jobToDelete.id);

            setLastDeletedJob(jobToDelete);

            /*
             * Remove from UI immediately.
             */
            setJobs(prevJobs =>
                prevJobs.filter(
                    job =>
                        (job._id || job.id) !==
                        (jobToDelete._id || jobToDelete.id)
                )
            );

            addActivity(
                `Deleted ${jobToDelete.company}`
            );

            setJobToDelete(null);

            showToast("🗑 Job deleted successfully");


            const timer = setTimeout(() => {

                setLastDeletedJob(null);

                setToast("");

            }, 5000);

            setUndoTimer(timer);

        } catch (error) {

            console.error("Delete job error:", error);

            showToast("❌ Failed to delete job");

            setJobToDelete(null);

        }

    };


    
   const undoDelete = async () => {

    if (!lastDeletedJob) {
        return;
    }

    try {

        clearTimeout(undoTimer);

        await restoreJobAPI({

            company: lastDeletedJob.company,

            role: lastDeletedJob.role,

            status: lastDeletedJob.status,

            interviewDate:
                lastDeletedJob.interviewDate || null,

            createdAt:
                lastDeletedJob.createdAt

        });

        await fetchJobs();

        setLastDeletedJob(null);

        setToast("↩️ Job restored successfully");

    } catch (error) {

        console.error(
            "Restore job error:",
            error
        );

        setToast("❌ Failed to restore job");

    }

};

    const editJob = (job) => {

        setEditingJob(job);

        setShowForm(true);

    };


    

    const updateJob = async (updatedJob) => {

        try {

            await updateJobAPI(
                updatedJob._id || updatedJob.id,
                updatedJob
            );

            await fetchJobs();

            showToast("✏️ Job updated successfully");

            addActivity(
                `Updated ${updatedJob.company}`
            );

            setEditingJob(null);

            setShowForm(false);

        } catch (error) {

            console.error("Update job error:", error);

            showToast("❌ Update failed");

        }

    };


    
    function showToast(message) {

        setToast(message);

        setTimeout(() => {

            setToast("");

        }, 3000);

    }


    

    function addActivity(text) {

        setActivities(prev => [

            {
                id: Date.now(),

                text,

                time: new Date().toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )
            },

            ...prev

        ]);

    }


    

    function closeJobForm() {

        setShowForm(false);

        setEditingJob(null);

    }


    

    function exportJobs() {

        const data = JSON.stringify(
            jobs,
            null,
            2
        );

        const blob = new Blob(
            [data],
            {
                type: "application/json"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = "jobs.json";

        link.click();

        URL.revokeObjectURL(url);

    }


    return (

        <BrowserRouter>

            <Routes>

                {/* LANDING PAGE */}

                <Route
                    path="/"
                    element={<Landing />}
                />


                {/* AUTH */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <SignUp />
                    }
                />


                {/* MAIN PAGES */}

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
                            setStatusFilter={
                                setStatusFilter
                            }

                            showForm={showForm}
                            setShowForm={
                                setShowForm
                            }

                            editingJob={editingJob}

                            jobToDelete={
                                jobToDelete
                            }

                            lastDeletedJob={
                                lastDeletedJob
                            }

                            undoDelete={
                                undoDelete
                            }

                            toast={toast}

                            addJob={addJob}

                            deleteJob={(job) =>
                                setJobToDelete(job)
                            }

                            confirmDelete={
                                confirmDelete
                            }

                            editJob={editJob}

                            updateJob={updateJob}

                            setJobToDelete={
                                setJobToDelete
                            }

                            closeToast={() =>
                                setToast("")
                            }

                            closeForm={
                                closeJobForm
                            }

                            exportJobs={
                                exportJobs
                            }

                        />

                    }
                />


                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/calendar"
                    element={
                        <InterviewCalendar />
                    }
                />

                <Route
                    path="/resume"
                    element={<Resume />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/job/:id"
                    element={<JobDetails />}
                />


                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;