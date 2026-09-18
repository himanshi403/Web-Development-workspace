
import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import Layout from "../components/Layout";

import {
    getSingleJob,
    updateJob
} from "../services/jobService";

import CompanyLogo from "../components/CompanyLogo";


function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    /* =========================
       JOB STATES
    ========================= */

    const [
        job,
        setJob
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    /* =========================
       EDIT STATES
    ========================= */

    const [
        editing,
        setEditing
    ] = useState(false);

    const [
        company,
        setCompany
    ] = useState("");

    const [
        role,
        setRole
    ] = useState("");

    const [
        status,
        setStatus
    ] = useState("Applied");

    const [
        interviewDate,
        setInterviewDate
    ] = useState("");

    const [
        notes,
        setNotes
    ] = useState("");


    /* =========================
       SAVE STATE
    ========================= */

    const [
        saving,
        setSaving
    ] = useState(false);


    /* =========================
       NOTES MODAL STATES
    ========================= */

    const [
        notesModalOpen,
        setNotesModalOpen
    ] = useState(false);

    const [
        notesDraft,
        setNotesDraft
    ] = useState("");


    /* =========================
       FETCH JOB
    ========================= */

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


    /* =========================
       OPEN NOTES MODAL
    ========================= */

    const openNotesModal = () => {

        setNotesDraft(
            notes || ""
        );

        setNotesModalOpen(true);

    };


    /* =========================
       CLOSE NOTES MODAL
    ========================= */

    const closeNotesModal = () => {

        setNotesModalOpen(false);

    };


    /* =========================
       SAVE NOTES DRAFT
    ========================= */

    const saveNotesDraft = () => {

        setNotes(
            notesDraft
        );

        setNotesModalOpen(false);

    };


    /* =========================
       SAVE JOB
    ========================= */

    const handleSave = async () => {

        try {

            setSaving(true);


            const response =
                await updateJob(
                    id,
                    {

                        company,

                        role,

                        status,

                        interviewDate:
                            interviewDate || null,

                        notes

                    }
                );


            const updatedJob =
                response.data.job;


            setJob(
                updatedJob
            );


            setCompany(
                updatedJob.company || ""
            );


            setRole(
                updatedJob.role || ""
            );


            setStatus(
                updatedJob.status || "Applied"
            );


            setInterviewDate(

                updatedJob.interviewDate

                    ? updatedJob.interviewDate
                        .split("T")[0]

                    : ""

            );


            setNotes(
                updatedJob.notes || ""
            );


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


    /* =========================
       LOADING
    ========================= */

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


    /* =========================
       ERROR
    ========================= */

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


    /* =========================
       MAIN PAGE
    ========================= */

    return (

        <Layout>

            <div className="job-details-page">


                {/* =========================
                   BACK BUTTON
                ========================== */}

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>


                {/* =========================
                   DETAILS CARD
                ========================== */}

                <div className="details-card">


                    {/* =====================
                       HEADER
                    ====================== */}

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


                    {/* =========================
                       DETAILS GRID
                    ========================== */}

                    <div className="details-grid">


                        {/* =====================
                           STATUS
                        ====================== */}

                        <div className="detail-item">

                            <h4>
                                Status
                            </h4>


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


                        {/* =====================
                           APPLICATION DATE
                        ====================== */}

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


                        {/* =====================
                           INTERVIEW DATE
                        ====================== */}

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


                        {/* =====================
                           JOB ID
                        ====================== */}

                        <div className="detail-item">

                            <h4>
                                Job ID
                            </h4>


                            <p>
                                {job._id}
                            </p>

                        </div>


                        {/* =====================
                           NOTES
                        ====================== */}

                        <div className="detail-item notes-card">

                            <h4>
                                Notes
                            </h4>


                            <p className="notes-preview-text">

                                {notes

                                    ? "Your application notes are available."

                                    : "No notes added yet."}

                            </p>


                            <button
                                type="button"
                                className="check-notes-btn"
                                onClick={
                                    openNotesModal
                                }
                            >

                                {editing

                                    ? notes
                                        ? "✏ Edit Notes"
                                        : "✏ Add Notes"

                                    : "📖 Check Notes"}

                            </button>

                        </div>


                    </div>


                    {/* =========================
                       NOTEBOOK MODAL
                    ========================== */}

                    {notesModalOpen && (

                        <div
                            className="notes-modal-overlay"
                            onClick={
                                closeNotesModal
                            }
                        >

                            <div
                                className="notes-modal"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >


                                {/* =====================
                                   NOTEBOOK HEADER
                                ====================== */}

                                <div
                                    className="notes-modal-header"
                                >

                                    <div>

                                        <span className="notes-modal-label">
                                            APPLICATION NOTEBOOK
                                        </span>


                                        <h2>

                                            {editing

                                                ? "Write your notes"

                                                : "Your Notes"}

                                        </h2>


                                        <p>
                                            {job.company}
                                            {" • "}
                                            {job.role}
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        className="notes-close-btn"
                                        onClick={
                                            closeNotesModal
                                        }
                                        aria-label="Close notes"
                                    >
                                        ✕
                                    </button>

                                </div>


                                {/* =====================
                                   NOTEBOOK PAPER
                                ====================== */}

                                <div
                                    className="notebook-paper"
                                >

                                    {editing ? (

                                        <textarea
                                            value={
                                                notesDraft
                                            }
                                            onChange={(e) =>
                                                setNotesDraft(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Write anything you want to remember about this application..."
                                        />

                                    ) : (

                                        <div
                                            className="saved-notes-content"
                                        >

                                            {notes ? (

                                                notes
                                                    .split("\n")
                                                    .map(
                                                        (
                                                            line,
                                                            index
                                                        ) => (

                                                            <p
                                                                key={
                                                                    index
                                                                }
                                                            >

                                                                {line ||
                                                                    "\u00A0"}

                                                            </p>

                                                        )
                                                    )

                                            ) : (

                                                <p
                                                    className="empty-notes"
                                                >
                                                    No notes have been
                                                    added yet.
                                                </p>

                                            )}

                                        </div>

                                    )}

                                </div>


                                {/* =====================
                                   NOTEBOOK ACTIONS
                                ====================== */}

                                <div
                                    className="notes-modal-actions"
                                >

                                    {editing ? (

                                        <>

                                            <button
                                                type="button"
                                                className="notes-cancel-btn"
                                                onClick={
                                                    closeNotesModal
                                                }
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type="button"
                                                className="notes-save-btn"
                                                onClick={
                                                    saveNotesDraft
                                                }
                                            >
                                                Done
                                            </button>

                                        </>

                                    ) : (

                                        <button
                                            type="button"
                                            className="notes-save-btn"
                                            onClick={
                                                closeNotesModal
                                            }
                                        >
                                            Close Notebook
                                        </button>

                                    )}

                                </div>


                            </div>

                        </div>

                    )}


                </div>


                {/* =========================
                   EDIT / SAVE JOB
                ========================== */}

                {editing ? (

                    <button
                        className="edit-job-btn"
                        onClick={
                            handleSave
                        }
                        disabled={
                            saving
                        }
                    >

                        {saving
                            ? "Saving..."
                            : "Save Job"}

                    </button>

                ) : (

                    <button
                        className="edit-job-btn"
                        onClick={() =>
                            setEditing(true)
                        }
                    >
                        Edit Job
                    </button>

                )}


            </div>

        </Layout>

    );

}


export default JobDetails;

