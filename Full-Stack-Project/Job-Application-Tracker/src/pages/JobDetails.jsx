import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {getSingleJob,updateJob} from "../services/jobService";
import CompanyLogo from "../components/CompanyLogo";

function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [editing, setEditing] = useState(false);

    const [company, setCompany] = useState("");

    const [role, setRole] = useState("");

    const [status, setStatus] = useState("Applied");

    const [interviewDate, setInterviewDate] =
        useState("");

    const [notes, setNotes] = useState("");

    const [saving, setSaving] = useState(false);


    // FETCH JOB

    useEffect(() => {

        const fetchJob = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getSingleJob(id);

                const fetchedJob =
                    response.data.job;

                setJob(fetchedJob);

                setCompany(
                    fetchedJob.company || ""
                );

                setRole(
                    fetchedJob.role || ""
                );

                setStatus(
                    fetchedJob.status || "Applied"
                );

                setInterviewDate(
                    fetchedJob.interviewDate
                        ? fetchedJob.interviewDate
                            .split("T")[0]
                        : ""
                );

                setNotes(
                    fetchedJob.notes || ""
                );

            } catch (error) {

                console.error(
                    "Error fetching job:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load job"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchJob();

    }, [id]);


    // SAVE JOB 

    const handleSave = async () => {

        try {

            setSaving(true);

            const response =
                await updateJob(id, {

                    company,

                    role,

                    status,

                    interviewDate:
                    interviewDate || null,

                    notes

                });

           const updatedJob = response.data.job;

            setJob(updatedJob);

            setCompany(updatedJob.company);
            setRole(updatedJob.role);
            setStatus(updatedJob.status);
            setNotes(updatedJob.notes || "");

            setEditing(false);

        } catch (error) {

            console.error(
                "Error updating job:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update job"
            );

        } finally {

            setSaving(false);

        }

    };


    // LOADING

    if (loading) {

        return (

            <Layout>

                <div className="job-details-page">

                    <h2>
                        Loading job details...
                    </h2>

                </div>

            </Layout>

        );

    }


    //ERROR

    if (error || !job) {

        return (

            <Layout>

                <div className="job-details-page">
                 <h2>
                        {error || "Job Not Found"}
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                   

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="job-details-page">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>


                <div className="details-card">


                    {/* HEADER */}

                    <div className="details-header">

                        <CompanyLogo
    company={job.company}
    size="large"
/>


                        <div>

                            {editing ? (

                                <>

                                    <input
                                        value={company}
                                        onChange={(e) =>
                                            setCompany(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        value={role}
                                        onChange={(e) =>
                                            setRole(
                                                e.target.value
                                            )
                                        }
                                    />

                                </>

                            ) : (

                                <>

                                    <h1>
                                        {job.company}
                                    </h1>

                                    <h2>
                                        {job.role}
                                    </h2>

                                </>

                            )}

                        </div>

                    </div>


                    {/* DETAILS */}

                    <div className="details-grid">


                        {/* STATUS */}

                        <div className="detail-item">

                            <h4>Status</h4>

                            {editing ? (

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value
                                        )
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

                            ) : (

                                <p>
                                    {job.status}
                                </p>

                            )}

                        </div>


                        {/* APPLICATION DATE */}

                        <div className="detail-item">

                            <h4>
                                Applied On
                            </h4>

                            <p>

                                {job.createdAt
                                    ? new Date(
                                        job.createdAt
                                    ).toLocaleDateString()
                                    : "Not Available"}

                            </p>

                        </div>


                        {/* INTERVIEW DATE */}

                        <div className="detail-item">

                            <h4>
                                Interview Date
                            </h4>

                            {editing ? (

                                <input
                                    type="date"
                                    value={
                                        interviewDate
                                    }
                                    onChange={(e) =>
                                        setInterviewDate(
                                            e.target.value
                                        )
                                    }
                                />

                            ) : (

                                <p>

                                    {job.interviewDate
                                        ? new Date(
                                            job.interviewDate
                                        ).toLocaleDateString()
                                        : "Not Scheduled"}

                                </p>

                            )}

                        </div>


                        {/* JOB ID */}

                        <div className="detail-item">

                            <h4>
                                Job ID
                            </h4>

                            <p>
                                {job._id}
                            </p>

                        </div>


                        {/* NOTES */}

                        <div className="detail-item">
<label className="notes-label">

    Notes

</label>

                            {editing ? (

                                <textarea
                                 className="job-notes-input"
                                    value={notes}
                                    onChange={(e) =>
                                        setNotes(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Add notes about this application..."
                                />

                            ) : (

                                <p>

                                    {job.notes ||
                                        "No notes added yet."}

                                </p>

                            )}

                        </div>

                    </div>


                    {/* BUTTONS */}

                    <div className="details-buttons">

                        {editing ? (

                            <>

                                <button
                                    className="save-btn"
                                    onClick={handleSave}
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save"}

                                </button>


                                <button
                                    className="cancel-btn"
                                    onClick={() =>
                                        setEditing(false)
                                    }
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                            </>

                        ) : (

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    setEditing(true)
                                }
                            >
                                Edit Job
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default JobDetails;