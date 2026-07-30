import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useState } from "react";
import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState(false);

    return (
         <AuthLayout
    title="Welcome Back 👋"
    subtitle="Continue tracking your dream job journey."
>

<div className="auth-card">

                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />

                     <button
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                >
                    {showPassword ? "Hide Password" : "Show Password"}
                </button>

                    <button
                        className="login-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        Login

                    </button>

                     <p className="forgot-password">
                    Forgot Password?
                </p>


                <div className="social-login">

                    <button type="button">
                        Continue with Google
                    </button>

                    <button type="button">
                        Continue with GitHub
                    </button>

                </div>

                    <p>

                        Don't have an account?{" "}

                        <Link to="/signup">

                            Signup

                        </Link>

                    </p>

                </div>
                 </AuthLayout>
                 );

}

export default Login;