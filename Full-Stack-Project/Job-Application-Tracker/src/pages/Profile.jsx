import { useState, useEffect } from "react";

import EditProfileModal from "../components/EditProfileModal";
import Layout from "../components/Layout";

import {
    getProfile,
    updateProfile as updateProfileAPI
} from "../services/profileService";


function Profile() {

 


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
                        No resume uploaded.
                    </p>

                    <button className="resume-btn">

                        Upload Resume

                    </button>

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