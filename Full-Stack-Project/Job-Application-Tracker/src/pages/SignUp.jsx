import { Link } from "react-router-dom";

function SignUp(){
    return(
        <div className="auth-page">
            <h1>Create Account</h1>
            <input
            type="text"
            placeholder="Enter Your Full Name"
            />
            <input
            type="email"
            placeholder="email"
            />
            <input

              type="password"

              placeholder="Password"

            />
            <button>Signup</button>

            <p>
                Already have an account?
                <Link to="/login">
                Login
                </Link>
            </p>

        </div>
    );
}
export default SignUp;
