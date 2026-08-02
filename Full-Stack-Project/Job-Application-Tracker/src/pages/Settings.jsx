import { useState } from "react";
import Layout from "../components/Layout";

function Settings({ jobs }) {

    const [darkMode, setDarkMode] = useState(
        document.body.classList.contains("dark")
    );

    function toggleTheme() {

        document.body.classList.toggle("dark");

        setDarkMode(document.body.classList.contains("dark"));

    }

    function exportJobs() {

        const data = JSON.stringify(jobs, null, 2);

        const blob = new Blob([data], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "jobs.json";

        link.click();

    }

    function clearJobs() {

        const confirmDelete = window.confirm(
            "Delete all jobs permanently?"
        );

        if (!confirmDelete) return;

        localStorage.removeItem("jobs");

        window.location.reload();

    }

    return (
        <Layout>

        <div className="settings-page">

            <h1>⚙ Settings</h1>

            <div className="settings-grid">

                <div className="setting-card">

                    <h3>Appearance</h3>

                    <p>
                        Choose your preferred theme.
                    </p>

                    <button
                        onClick={toggleTheme}
                    >

                        {darkMode
                            ? "☀ Light Mode"
                            : "🌙 Dark Mode"}

                    </button>

                </div>

                <div className="setting-card">

                    <h3>Export Applications</h3>

                    <p>

                        Download all job applications
                        as JSON.

                    </p>

                    <button
                        onClick={exportJobs}
                    >

                        📥 Export Jobs

                    </button>

                </div>

                <div className="setting-card">

                    <h3>Application Summary</h3>

                    <p>

                        Total Applications

                    </p>

                    <h2>{jobs.length}</h2>

                </div>

                <div className="setting-card">

                    <h3>About</h3>

                    <p>

                        Job Tracker v1.0

                    </p>

                    <p>

                        Built using React.

                    </p>

                </div>

                <div className="setting-card danger-card">

                    <h3>Danger Zone</h3>

                    <p>

                        Delete all saved jobs.

                    </p>

                    <button
                        className="danger-btn"
                        onClick={clearJobs}
                    >

                        🗑 Clear All Jobs

                    </button>

                </div>

            </div>

        </div>
        </Layout>


    );

}

export default Settings;