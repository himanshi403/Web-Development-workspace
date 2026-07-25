import {Link} from "react-router-dom";

function Login(){
    return(
        <div className="auth-page">
            <h1>Login</h1>
            <input
            type="email"
            placeholder="email"
            />
            <input
            type="password"
            placeholder="Password"
            />

            <button>Login</button>

            <p>Don't have an account
            <Link to="/signup">
            Signup
            </Link>
            </p>
        </div>
    );
}
export default Login;