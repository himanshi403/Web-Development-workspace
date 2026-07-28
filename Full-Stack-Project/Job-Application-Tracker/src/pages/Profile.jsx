import Layout from "../components/Layout";

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
    return(
        <div className="profile-page">

            <div className="profile-card">

                <div className="avatar">

                    👤

                </div>

                <h1>Himanshi Prashar</h1>

                <p>Computer Science Student</p>

                <p>Ambala, Haryana</p>

                <hr />

                <p>

                    <strong>Email :</strong>

                    himanshi@email.com

                </p>
                 <p>

                    <strong>Member Since :</strong>

                    July 2026

                </p>

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
             <div className="resume-card">

                <h2>Resume</h2>

                <p>No resume uploaded.</p>

                <button>

                    Upload Resume

                </button>

            </div>

        </div>
    );
}
export default Profile;