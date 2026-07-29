import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return (

        <div className="login-page">

            <div className="login-left">

                <h1>Welcome Back 👋</h1>

                <p>

                    Continue tracking your dream job journey
                    with one dashboard.

                </p>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h1>Login</h1>

                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                    />

                    <button
                        className="login-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        Login

                    </button>

                    <p>

                        Don't have an account?{" "}

                        <Link to="/signup">

                            Signup

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;