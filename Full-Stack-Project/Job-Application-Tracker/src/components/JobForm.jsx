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
    const [saving, setSaving] = useState(false);
    


    useEffect(() => {

        if (editingJob) {

            setCompany(editingJob.company || "");
            setRole(editingJob.role || "");
            setStatus(editingJob.status || "Applied");

            // Convert MongoDB date into YYYY-MM-DD
            setInterviewDate(
                editingJob.interviewDate
                    ? new Date(editingJob.interviewDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
            );

        } else {

            setCompany("");
            setRole("");
            setStatus("Applied");
            setInterviewDate("");

        }

    }, [editingJob]);


    const handleSubmit = async () => {

        if (saving) return;


        if (!company.trim() || !role.trim()) {

            alert("Please fill in Company Name and Job Role.");

            return;

        }


        try {

            setSaving(true);


            if (editingJob) {

                await updateJob({

                    ...editingJob,

                    // MongoDB uses _id
                    _id: editingJob._id,

                    company: company.trim(),

                    role: role.trim(),

                    status,

                    // Send null if no interview date is selected
                    interviewDate:
                        interviewDate || null

                });

            } else {

                await addJob({

                    company: company.trim(),

                    role: role.trim(),

                    status,

                    interviewDate:
                        interviewDate || null

                });

            }


            setCompany("");
            setRole("");
            setStatus("Applied");
            setInterviewDate("");


            closeForm();

        } catch (error) {

            console.error(
                "Job form submission error:",
                error
            );

        } finally {

            setSaving(false);

        }

    };


    return (

        <div className="jobForm">

            <h2>

                {editingJob
                    ? "Edit Job"
                    : "Add Job"}

            </h2>


            <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) =>
                    setCompany(e.target.value)
                }
            />


            <input
                type="text"
                placeholder="Job Role"
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)
                }
            />


            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >

                <option value="Applied">
                    Applied
                </option>

                <option value="Interview">
                    Interview
                </option>

                <option value="Offer">
                    Offer
                </option>

                <option value="Rejected">
                    Rejected
                </option>

            </select>


            <label className="date-label">

                Interview Date

            </label>


            <input
                type="date"
                value={interviewDate}
                onChange={(e) =>
                    setInterviewDate(e.target.value)
                }
            />


            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={saving}
            >

                {
                    saving
                        ? "Saving..."
                        : editingJob
                            ? "Save Changes"
                            : "Add Job"
                }

            </button>


            <button
                type="button"
                className="cancel-btn"
                onClick={closeForm}
                disabled={saving}
            >

                Cancel

            </button>

        </div>

    );

}

export default JobForm;