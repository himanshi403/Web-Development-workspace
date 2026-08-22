import { useState , useEffect} from "react";
import Layout from "../components/Layout";

import {
    deleteAllJobs
} from "../services/jobService";


function Settings({
    jobs = [],
    fetchJobs
}) {

    const [darkMode, setDarkMode] = useState(
        document.body.classList.contains("dark")
    );

    const [clearingJobs, setClearingJobs] =
        useState(false);

    useEffect(() => {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        setDarkMode(true);

    } else {

        document.body.classList.remove("dark");

        setDarkMode(false);

    }

}, []);


    // =========================================================
    // THEME
    // =========================================================

    function toggleTheme() {

    const newTheme =
        darkMode ? "light" : "dark";

    document.body.classList.remove(
        "light",
        "dark"
    );

    document.body.classList.add(
        newTheme
    );

    localStorage.setItem(
        "theme",
        newTheme
    );

    setDarkMode(
        newTheme === "dark"
    );

}


    // =========================================================
    // EXPORT JOBS
    // =========================================================

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


    // =========================================================
    // DELETE ALL JOBS
    // =========================================================

    async function clearJobs() {

        const confirmDelete =
            window.confirm(
                "Delete all your job applications permanently?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            setClearingJobs(true);


            await deleteAllJobs();


            await fetchJobs();


            alert(
                "All job applications deleted successfully."
            );

        }

        catch (error) {

            console.error(
                "Error deleting all jobs:",
                error
            );


            alert(
                "Failed to delete job applications."
            );

        }

        finally {

            setClearingJobs(false);

        }

    }


    return (

        <Layout>

            <div className="settings-page">

                <h1>
                    ⚙ Settings
                </h1>


                <div className="settings-grid">


                    {/* APPEARANCE */}

                    <div className="setting-card">

                        <h3>
                            Appearance
                        </h3>

                        <p>
                            Choose your preferred theme.
                        </p>


                        <button
                            onClick={toggleTheme}
                        >

                            {
                                darkMode
                                    ? "☀ Light Mode"
                                    : "🌙 Dark Mode"
                            }

                        </button>

                    </div>



                    {/* EXPORT */}

                    <div className="setting-card">

                        <h3>
                            Export Applications
                        </h3>

                        <p>

                            Download all your job applications
                            as JSON.

                        </p>


                        <button
                            onClick={exportJobs}
                        >

                            📥 Export Jobs

                        </button>

                    </div>



                    {/* SUMMARY */}

                    <div className="setting-card">

                        <h3>
                            Application Summary
                        </h3>

                        <p>
                            Total Applications
                        </p>

                        <h2>
                            {jobs.length}
                        </h2>

                    </div>



                    {/* ABOUT */}

                    <div className="setting-card">

                        <h3>
                            About
                        </h3>

                        <p>
                            Job Tracker v1.0
                        </p>

                        <p>
                            Built using React and Node.js.
                        </p>

                    </div>



                    {/* DANGER ZONE */}

                    <div className="setting-card danger-card">

                        <h3>
                            Danger Zone
                        </h3>

                        <p>

                            Permanently delete all your
                            job applications.

                        </p>


                        <button
                            className="danger-btn"
                            onClick={clearJobs}
                            disabled={clearingJobs}
                        >

                            {
                                clearingJobs
                                    ? "Deleting..."
                                    : "🗑 Clear All Jobs"
                            }

                        </button>

                    </div>


                </div>

            </div>

        </Layout>

    );

}


export default Settings;