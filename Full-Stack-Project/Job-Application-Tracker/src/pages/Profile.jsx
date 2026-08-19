import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

import EditProfileModal from "../components/EditProfileModal";
import Layout from "../components/Layout";

import {
    getProfile,
    updateProfile as updateProfileAPI
} from "../services/profileService";

import { uploadResume } from "../services/resumeService";


function Profile() {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

const [uploadingResume, setUploadingResume] =
    useState(false);

const [resumeMessage, setResumeMessage] =
    useState("");


    const [profile, setProfile] = useState(null);

    const [showEdit, setShowEdit] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // FETCH LOGGED-IN USER PROFILE
    useEffect(() => {

        const fetchProfile = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await getProfile();

                const user = response.data.user;

                setProfile(user);

            } catch (error) {

                console.error(
                    "Error fetching profile:",
                    error
                );

                setError(
                    "Failed to load profile."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);


    // UPDATE PROFILE
    const updateProfile = async (formData) => {

        try {

            const response =
                await updateProfileAPI(formData);

            return response.data.user;

        } catch (error) {

            console.error(
                "Error updating profile:",
                error
            );

            throw error;

        }

    };

    const handleResumeButtonClick = () => {

    fileInputRef.current.click();

};

const handleResumeUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;


    if (file.type !== "application/pdf") {

        setResumeMessage(
            "Please select a PDF resume."
        );

        e.target.value = "";

        return;

    }


    try {

        setUploadingResume(true);

        setResumeMessage("");


        const formData = new FormData();

        formData.append(
            "resume",
            file
        );


        await uploadResume(formData);


        setResumeMessage(
            "Resume uploaded successfully! You can view it on the Resume Library page."
        );


    } catch (error) {

        console.error(
            "Error uploading resume:",
            error
        );

        setResumeMessage(
            "Failed to upload resume. Please try again."
        );

    } finally {

        setUploadingResume(false);

        e.target.value = "";

    }

};


    if (loading) {

        return (

            <Layout>

                <div className="profile-page">

                    <h2>
                        Loading profile...
                    </h2>

                </div>

            </Layout>

        );

    }


    if (error) {

        return (

            <Layout>

                <div className="profile-page">

                    <h2>
                        {error}
                    </h2>

                </div>

            </Layout>

        );

    }


    const initials = profile?.name
        ? profile.name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U";


    return (

        <Layout>

            <div className="profile-page">


                <div className="profile-header-card">

                    <div className="profile-avatar">

                        {initials}

                    </div>


                    <p className="profile-location">

                        📍 {
                            profile.location ||
                            "Not added yet"
                        }

                    </p>


                    <h1>

                        {profile.name}

                    </h1>


                    <p>

                        {
                            profile.role ||
                            "Not added yet"
                        }

                    </p>


                    <hr />


                    <p className="profile-email">

                        ✉ {profile.email}

                    </p>


                    <p className="member-since">

                        <strong>
                            Member Since :
                        </strong>

                        {" "}

                        {
                            profile.createdAt
                                ? new Date(
                                    profile.createdAt
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        month: "long",
                                        year: "numeric"
                                    }
                                )
                                : "Not Available"
                        }

                    </p>


                    <button
                        className="edit-profile-btn"
                        onClick={() =>
                            setShowEdit(true)
                        }
                    >

                        ✏ Edit Profile

                    </button>

                </div>




                <div className="about-card">

                    <h2>About Me</h2>

                    <p>

                        {
                            profile.about ||
                            "Not added yet."
                        }

                    </p>

                </div>



                <div className="career-card">

                    <h2>Career Goal</h2>

                    <p>

                        {
                            profile.goal ||
                            "Not added yet."
                        }

                    </p>

                </div>



                <div className="skills-card">

                    <h2>Skills</h2>

                    <div className="skills-container">

                        <span>☕ Java</span>
                        <span>⚛ React</span>
                        <span>🌐 HTML</span>
                        <span>🎨 CSS</span>
                        <span>🍃 MongoDB</span>
                        <span>🚀 Node.js</span>
                        <span>💻 JavaScript</span>
                        <span>🔧 Git</span>

                    </div>

                </div>


<div className="resume-card">

    <h2>Resume</h2>

    <p>
        Upload your latest resume here. Your uploaded
        resumes will be available in the Resume Library.
    </p>


    <input
        type="file"
        accept=".pdf,application/pdf"
        ref={fileInputRef}
        onChange={handleResumeUpload}
        style={{ display: "none" }}
    />


    <button
        className="resume-btn"
        onClick={handleResumeButtonClick}
        disabled={uploadingResume}
    >

        {
            uploadingResume
                ? "Uploading..."
                : "📤 Upload Resume"
        }

    </button>


    {

        resumeMessage &&

        <div className="profile-resume-message">

            <p>
                {resumeMessage}
            </p>


            {

                resumeMessage.includes(
                    "successfully"
                ) &&

                <button
                    className="go-resume-page-btn"
                    onClick={() =>
                        navigate("/resume")
                    }
                >

                    Go to Resume Library →

                </button>

            }

        </div>

    }

</div>


                {

                    showEdit &&

                    <EditProfileModal

                        profile={profile}

                        setProfile={setProfile}

                        updateProfile={updateProfile}

                        closeModal={() =>
                            setShowEdit(false)
                        }

                    />

                }


            </div>

        </Layout>

    );

}

export default Profile;