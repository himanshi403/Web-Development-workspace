import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import "../styles/auth.css";

function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    return (

        <AuthLayout
            title="Create Your Account 🚀"
            subtitle="Start organizing every job application today."
        >

            <div className="auth-card">

                <h2>Signup</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                />

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
                    Create Account
                </button>

                <p>

                    Already have an account?{" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </AuthLayout>

    );

}

export default SignUp; 
