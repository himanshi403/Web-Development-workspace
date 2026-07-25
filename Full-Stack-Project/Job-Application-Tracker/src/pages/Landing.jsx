import {Link} from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <h1>Job Application Tracker</h1>
      <p>Track your applications with ease.</p>

    <Link to="/login">
      <button>Login</button>
      </Link>

    <Link to="/signup">
    <button>Signup</button>
    </Link>
    </div>
  );
}

export default Landing;