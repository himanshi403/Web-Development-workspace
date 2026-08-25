import { useEffect, useState, useRef } from "react";

import Layout from "../components/Layout";

import {

    uploadResume,

    getResumes,

    deleteResume

} from "../services/resumeService";


function Resume() {
    

    const [resumes, setResumes] =
        useState([]);

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState("");
        const fileInputRef = useRef(null);


    // ==============================
    // FETCH RESUMES
    // ==============================

    const fetchResumes = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getResumes();

            setResumes(

                response.data.resumes || []

            );

        }

        catch (error) {

            console.error(
                "Error fetching resumes:",
                error
            );

            setError(
                "Failed to load resumes."
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchResumes();

    }, []);


    // ==============================
    // SELECT FILE
    // ==============================

    function handleFileChange(e) {

        const file =
            e.target.files[0];

        if (!file) return;


        if (
            file.type !==
            "application/pdf"
        ) {

            setError(
                "Please select a PDF file."
            );

            return;

        }


        setSelectedFile(file);

        setError("");

    }


    // ==============================
    // UPLOAD RESUME
    // ==============================

    const handleUpload = async () => {

        if (!selectedFile) {

            setError(
                "Please select a resume first."
            );

            return;

        }


        try {

            setUploading(true);

            setError("");


            const formData =
                new FormData();

            formData.append(

                "resume",

                selectedFile

            );


            const response =
                await uploadResume(
                    formData
                );


            const newResume =
                response.data.resume;


            setResumes(prev => [

                newResume,

                ...prev

            ]);


            setSelectedFile(null);


           if (fileInputRef.current) {
    fileInputRef.current.value = "";
}

        }

        catch (error) {

            console.error(
                "Upload error:",
                error
            );

            setError(

                error.response?.data?.message ||

                "Resume upload failed."

            );

        }

        finally {

            setUploading(false);

        }

    };


    // ==============================
    // DELETE RESUME
    // ==============================

    const handleDelete =
        async (resumeId) => {

            const confirmDelete =
                window.confirm(

                    "Delete this resume?"

                );


            if (!confirmDelete) return;


            try {

                await deleteResume(
                    resumeId
                );


                setResumes(prev =>

                    prev.filter(

                        resume =>

                            resume._id !==
                            resumeId

                    )

                );

            }

            catch (error) {

                console.error(
                    "Delete error:",
                    error
                );

                alert(
                    error.response?.data?.message ||

                    "Failed to delete resume."
                );

            }

        };


  function getResumeUrl(resume) {

    const fileName =
        resume.filePath
            .split("\\")
            .pop()
            .split("/")
            .pop();

   return `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${fileName}`;

}


    return (

        <Layout>

            <div className="resume-page">


                <div className="resume-header">

                    <div>

                        <h1>
                            Resume Library
                        </h1>

                        <p>

                            Upload, manage and access
                            your resumes in one place.

                        </p>

                    </div>

                </div>


                <div className="resume-upload-card">

                    <h2>
                        Upload Resume
                    </h2>

                    <p>

                        Upload your resume in PDF format.

                    </p>


                   <input
    ref={fileInputRef}
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
/>


                    {

                        selectedFile && (

                            <p className="selected-file">

                                📄

                                {selectedFile.name}

                            </p>

                        )

                    }


                    <button

                        className="resume-btn"

                        onClick={handleUpload}

                        disabled={uploading}

                    >

                        {

                            uploading

                                ?

                                "Uploading..."

                                :

                                "⬆ Upload Resume"

                        }

                    </button>


                    {

                        error && (

                            <p className="error-message">

                                {error}

                            </p>

                        )

                    }

                </div>


                <div className="resume-library">

                    <h2>
                        Your Resumes
                    </h2>


                    {

                        loading

                            ?

                            (

                                <p>

                                    Loading resumes...

                                </p>

                            )

                            :

                            resumes.length === 0

                                ?

                                (

                                    <div className="empty-state">

                                        <h3>

                                            📄 No Resumes Yet

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

                                                resume => (

                                                    <div

                                                        className="resume-card"

                                                        key={
                                                            resume._id
                                                        }

                                                    >

                                                        <div className="resume-file-icon">

                                                            📄

                                                        </div>


                                                        <div className="resume-info">

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

                                                                            day:
                                                                                "numeric",

                                                                            month:
                                                                                "short",

                                                                            year:
                                                                                "numeric"

                                                                        }

                                                                    )

                                                                }

                                                            </p>

                                                        </div>


                                                        <div className="resume-actions">


                                                            <a

                                                                href={
                                                                    getResumeUrl(
                                                                        resume
                                                                    )
                                                                }

                                                                target="_blank"

                                                                rel="noreferrer"

                                                                className="view-resume-btn"

                                                            >

                                                                👁 View

                                                            </a>


                                                            <button

                                                                className="delete-resume-btn"

                                                                onClick={() =>

                                                                    handleDelete(
                                                                        resume._id
                                                                    )

                                                                }

                                                            >

                                                                🗑 Delete

                                                            </button>

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