import {useState} from "react";

function Settings({jobs}){
    function exportJobs(){
        const data=JSON.stringify(
            jobs,
            null,
            2
        );
        const Blob=new blob(
            [data],
            {
                type:"application/json"
            }
        );
        const url=URL.createObjectURL(blob);
        const link=document.createElement("a");
        link.href=url;
        link.download="jobs.json";
        link.click();
    }

    function clearJobs(){
        const confirmClear=window.confirm(
            "Delete all jobs?"
        );
        if(!confirmClear) return;
         localStorage.removeItem("jobs");

    window.location.reload();

    }


    const[darkMode,setDarkMode]=useState(false);

    function toggleTheme(){
        setDarkMode(!darkMode)
            document.body.classList.toggle("dark");
        }
    

        return(
            <div className="settings-page">
                <h1>Settings</h1>

                <div className="setting-card">
                    <h2>Theme</h2>

                    <button 
                    onClick={toggleTheme}>
                        {
                            darkMode?
                             "☀️ Light Mode":
                             "🌙 Dark Mode"
                        }
                    </button>
                </div>

                <div className="setting-card">

    <h2>Export Data</h2>

    <button onClick={exportJobs}>

        Export Jobs

    </button>

</div>
<div className="setting-card">

    <h2>Danger Zone</h2>

    <button
        className="danger-btn"
        onClick={clearJobs}
    >

        Clear All Jobs

    </button>

</div>
            </div>
            
        );
    
}

export default Settings;