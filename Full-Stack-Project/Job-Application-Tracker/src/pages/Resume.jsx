import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";


function Resume() {

    const [resumes, setResumes] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const fileInputRef = useRef(null);


    // ================= FETCH RESUMES =================

    useEffect(() => {

        fetchResumes();

    }, []);


    async function fetchResumes() {

        try {

            setLoading(true);

            const response = await API.get("/resumes");

            setResumes(
                response.data.resumes || []
            );

        } catch (error) {

            console.error(
                "Failed to fetch resumes:",
                error
            );

            setMessage(
                "Failed to load resumes."
            );

        } finally {

            setLoading(false);

        }

    }


    // ================= FILE SELECT =================

    function handleFileChange(e) {

        const file = e.target.files[0];

        if (!file) return;


        if (file.type !== "application/pdf") {

            setMessage(
                "Please select a PDF file."
            );

            setSelectedFile(null);

            return;

        }


        setSelectedFile(file);

        setMessage("");

    }


    // ================= UPLOAD RESUME =================

    async function handleUpload() {

        if (!selectedFile) {

            setMessage(
                "Please select a resume first."
            );

            return;

        }


        try {

            setUploading(true);

            setMessage("");


            const formData = new FormData();

            formData.append(
                "resume",
                selectedFile
            );


            const response = await API.post(

                "/resumes",

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }

            );


            const uploadedResume =
                response.data.resume;


            setResumes((prevResumes) => [

                uploadedResume,

                ...prevResumes

            ]);


            setSelectedFile(null);


            if (fileInputRef.current) {

                fileInputRef.current.value = "";

            }


            setMessage(
                "Resume uploaded successfully!"
            );

        } catch (error) {

            console.error(
                "Resume upload failed:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to upload resume."
            );

        } finally {

            setUploading(false);

        }

    }


    return (

        <Layout>

            <div className="resume-page">


                {/* ================= HEADER ================= */}

                <div className="resume-header">

                    <div>

                        <p className="resume-label">

                            CAREER DOCUMENTS

                        </p>

                        <h1>

                            Resume Library

                        </h1>

                        <p className="resume-subtitle">

                            Keep your resumes organized
                            and ready for your next opportunity.

                        </p>

                    </div>


                    <div className="resume-count">

                        <span>

                            {resumes.length}

                        </span>

                        <p>

                            Resume
                            {resumes.length !== 1
                                ? "s"
                                : ""}

                        </p>

                    </div>

                </div>



                {/* ================= UPLOAD CARD ================= */}

                <div className="resume-upload-card">


                    <div className="upload-icon">

                        📄

                    </div>


                    <h2>

                        Upload a Resume

                    </h2>


                    <p>

                        Upload your latest resume in PDF format.

                    </p>


                    <div className="upload-actions">


                        <input

                            ref={fileInputRef}

                            type="file"

                            accept=".pdf"

                            id="resume-upload"

                            onChange={handleFileChange}

                            hidden

                        />


                        <label

                            htmlFor="resume-upload"

                            className="choose-file-btn"

                        >

                            Choose PDF

                        </label>


                        <button

                            className="upload-resume-btn"

                            onClick={handleUpload}

                            disabled={
                                !selectedFile ||
                                uploading
                            }

                        >

                            {

                                uploading

                                    ?

                                    "Uploading..."

                                    :

                                    "Upload Resume"

                            }

                        </button>

                    </div>


                    {

                        selectedFile &&

                        <div className="selected-file">

                            <span>

                                📎

                            </span>

                            <p>

                                {selectedFile.name}

                            </p>

                        </div>

                    }


                    {

                        message &&

                        <p

                            className={`resume-message ${
                                message.includes("successfully")
                                    ? "success-message"
                                    : "error-message"
                            }`}

                        >

                            {message}

                        </p>

                    }

                </div>



                {/* ================= RESUME LIST ================= */}

                <div className="resume-library-section">


                    <div className="resume-section-header">

                        <div>

                            <h2>

                                Your Resumes

                            </h2>

                            <p>

                                Manage all your uploaded
                                career documents.

                            </p>

                        </div>

                    </div>


                    {

                        loading

                            ?

                            (

                                <div className="resume-loading">

                                    Loading resumes...

                                </div>

                            )

                            :

                            resumes.length === 0

                                ?

                                (

                                    <div className="resume-empty-state">

                                        <div className="empty-icon">

                                            📁

                                        </div>

                                        <h3>

                                            No resumes yet

                                        </h3>

                                        <p>

                                            Upload your first resume
                                            to start building your
                                            resume library.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    <div className="resume-grid">


                                        {

                                            resumes.map(

                                                (resume) => (

                                                    <div

                                                        className="resume-card"

                                                        key={
                                                            resume._id
                                                        }

                                                    >

                                                        <div className="resume-card-top">


                                                            <div className="pdf-icon">

                                                                PDF

                                                            </div>


                                                            <div className="resume-file-info">

                                                                <h3>

                                                                    {
                                                                        resume.fileName
                                                                    }

                                                                </h3>


                                                                <p>

                                                                    Uploaded{" "}

                                                                    {
                                                                        new Date(

                                                                            resume.createdAt

                                                                        ).toLocaleDateString(

                                                                            "en-IN",

                                                                            {

                                                                                day: "numeric",

                                                                                month: "short",

                                                                                year: "numeric"

                                                                            }

                                                                        )

                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>


                                                        <div className="resume-card-footer">

                                                            <span>

                                                                Resume

                                                            </span>


                                                            <span className="resume-ready">

                                                                ✓ Ready

                                                            </span>

                                                        </div>

                                                    </div>

                                                )

                                            )

                                        }


                                    </div>

                                )

                    }

                </div>


            </div>

        </Layout>

    );

}


export default Resume;