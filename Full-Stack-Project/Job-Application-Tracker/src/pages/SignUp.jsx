import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/AuthShell";
import career from "../assets/career.svg";

import { register } from "../services/authService";

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            console.log("Sending signup request...");

            const response = await register({
                name,
                email,
                password
            });

            console.log("Signup response:", response.data);

            alert("Account created successfully! Please login.");

            navigate("/login");

        } catch (error) {
            console.error("Signup error:", error);

            alert(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {
            setLoading(false);
        }
    };

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

                <form onSubmit={handleSignup}>

                    {/* NAME */}
                    <div className="input-group">

                        <span>👤</span>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>

                    {/* EMAIL */}
                    <div className="input-group">

                        <span>📧</span>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="input-group">

                        <span>🔒</span>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {/* SHOW PASSWORD */}
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword
                            ? "🙈 Hide Password"
                            : "👁 Show Password"}
                    </button>

                    {/* SIGNUP */}
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "🚀 Create Account"}
                    </button>

                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="social-btn"
                >
                    Continue with Google
                </button>

                <button
                    type="button"
                    className="social-btn"
                >
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