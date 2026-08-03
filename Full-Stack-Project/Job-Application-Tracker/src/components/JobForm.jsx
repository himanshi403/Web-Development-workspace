import { useState, useEffect } from "react";

function JobForm({
    addJob,
    editingJob,
    updateJob,
    closeForm
}) {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [interviewDate, setInterviewDate] = useState("");
    const [saving,setSaving]=useState(false);

    useEffect(() => {

        if (editingJob) {

            setCompany(editingJob.company);
            setRole(editingJob.role);
            setStatus(editingJob.status);
            setInterviewDate(editingJob.interviewDate || "");

        } else {

            setCompany("");
            setRole("");
            setStatus("Applied");
            setInterviewDate("");

        }

    }, [editingJob]);

    function handleSubmit() {
        if(saving) return;

setSaving(true);

        if (company === "" || role === "") {

            alert("Fill all fields");
            return;

        }

        if (editingJob) {

            updateJob({

                id: editingJob.id,
                company,
                role,
                status,
                interviewDate,
                createdAt: editingJob.createdAt

            });
            setSaving(false);

        } else {

            const newJob = {

                id: Date.now(),
                company,
                role,
                status,
                interviewDate,
                createdAt: new Date().toISOString()

            };

            addJob(newJob);

        }

        closeForm();
        

        setCompany("");
        setRole("");
        setStatus("Applied");

    }

    return (

        <div className="jobForm">

            <h2>

                {saving
? "Saving..."
: editingJob
? "Save Changes"
: "Add Job"}

            </h2>

            <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <input
                type="text"
                placeholder="Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>

            </select>
            <label className="date-label">

Interview Date

</label>

<input

type="date"

value={interviewDate}

onChange={(e)=>setInterviewDate(e.target.value)}

/>

            <button
                className="submit-btn"
                onClick={handleSubmit}
            >

                {editingJob ? "Save Changes" : "Add Job"}

            </button>

            <button
                type="button"
                className="cancel-btn"
                onClick={closeForm}
            >

                Cancel

            </button>

        </div>

    );

}

export default JobForm;