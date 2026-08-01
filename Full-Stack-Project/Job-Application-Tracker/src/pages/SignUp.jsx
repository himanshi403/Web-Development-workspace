import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/AuthShell";
import career from "../assets/career.svg";

function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    return (

        <AuthShell
            title="Start Your Career 🚀"
            subtitle="Create your account and organize every job application in one place."
            image={career}
        >

            <div className="auth-card">

                <h2>Create Account</h2>

                <p className="auth-subtitle">

                    Join JobTracker today.

                </p>

                <div className="input-group">

                    <span>👤</span>

                    <input
                        type="text"
                        placeholder="Full Name"
                    />

                </div>

                <div className="input-group">

                    <span>📧</span>

                    <input
                        type="email"
                        placeholder="Email"
                    />

                </div>

                <div className="input-group">

                    <span>🔒</span>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />

                </div>

                <button
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >

                    {showPassword ? "🙈 Hide Password" : "👁 Show Password"}

                </button>

                <button
                    className="login-btn"
                    onClick={() => navigate("/dashboard")}
                >

                    🚀 Create Account

                </button>

                <div className="divider">

                    <span>OR</span>

                </div>

                <button className="social-btn">

                    Continue with Google

                </button>

                <button className="social-btn">

                    Continue with GitHub

                </button>

                <p className="switch-auth">

                    Already have an account?{" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </AuthShell>

    );

}

export default SignUp;
