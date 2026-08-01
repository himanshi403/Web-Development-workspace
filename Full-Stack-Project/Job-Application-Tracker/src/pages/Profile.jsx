import { useState, useEffect } from "react";
import EditProfileModal from "../components/EditProfileModal";

function Profile({jobs}){
    const total = jobs.length;

    const applied = jobs.filter(
        job => job.status === "Applied"
    ).length;

    const interview = jobs.filter(
        job => job.status === "Interview"
    ).length;

    const offer = jobs.filter(
        job => job.status === "Offer"
    ).length;

    const rejected = jobs.filter(
        job => job.status === "Rejected"
    ).length;

    const defaultProfile = {

    name: "Himanshi Prashar",

    role: "Computer Science Student",

    location: "Ambala, Haryana",

    email: "himanshi@email.com",

    about:
        "Passionate about Web Development and Java.",

    goal:
        "Seeking Software Engineering opportunities."

};

const [profile, setProfile] = useState(defaultProfile);

const [showEdit, setShowEdit] = useState(false);

useEffect(() => {

    const savedProfile =
        JSON.parse(localStorage.getItem("profile"));

    if (savedProfile) {

        setProfile(savedProfile);

    }

}, []);



    return(
        <div className="profile-page">
        

            <div className="profile-header-card">

                <div className="profile-avatar">

                    HP

                </div>

                  <p className="profile-location">

                    📍 Ambala, Haryana

                </p>

                <h1>{profile.name}</h1>

                <p>{profile.role}</p>

                <p>{profile.location}</p>

                <hr />

                <p className="profile-email">

                    ✉ {profile.email}

                </p>

                 <p className="member-since">

                    <strong>Member Since :</strong>

                    July 2026

                </p>
                    <button
    className="edit-profile-btn"
    onClick={() => setShowEdit(true)}
>

    ✏ Edit Profile

</button>

                </div>
                

            <div className="profile-stats">

                <div className="stat-box">

                    <h3>Total</h3>

                    <p>{total}</p>

                </div>

                <div className="stat-box">

                    <h3>Applied</h3>

                    <p>{applied}</p>

                </div>

                <div className="stat-box">

                    <h3>Interview</h3>

                    <p>{interview}</p>

                </div>

                <div className="stat-box">

                    <h3>Offer</h3>

                    <p>{offer}</p>

                </div>

                <div className="stat-box">

                    <h3>Rejected</h3>

                    <p>{rejected}</p>

                </div>

            </div>

            <div className="about-card">

                <h2>About Me</h2>

                <p>
                    {profile.about}

                </p>

            </div>
            <div className="career-card">

    <h2>Career Goal</h2>

    <p>{profile.goal}</p>

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

                <p>No resume uploaded.</p>

                <button className="resume-btn">

                    Upload Resume

                </button>

            </div>
            {
    showEdit &&

    <EditProfileModal

        profile={profile}

        setProfile={setProfile}

        closeModal={() => setShowEdit(false)}

    />
}

        </div>
    );
}
export default Profile;