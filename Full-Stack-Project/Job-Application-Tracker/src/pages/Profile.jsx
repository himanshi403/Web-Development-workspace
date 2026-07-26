import Layout from "../components/Layout";

function Profile(){
    return(
        <Layout>
        <div className="page">
            <h1>My Profile</h1>

            <div className="profile-card">
                <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
        /> 
        <h2>Himanshi</h2>
        <p>Computer Science Student</p>
        <p>Software Developer</p>
        <p>Ambala,Haryana</p>
        <button>Edit Profile</button>
            </div>
        </div>
        </Layout>
    );
}
export default Profile;