
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { GoogleLogin } from "@react-oauth/google";

import AuthShell from "../components/AuthShell";
import career from "../assets/career.svg";

import {
    login,
    googleLogin,
    forgotPassword
} from "../services/authService";

import {
    FaEye,
    FaEyeSlash,
    FaEnvelope,
    FaLock
} from "react-icons/fa";


function Login() {

    const navigate = useNavigate();

    // =========================
    // LOGIN STATES
    // =========================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // =========================
    // FORGOT PASSWORD STATES
    // =========================

    const [forgotMode, setForgotMode] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMessage, setForgotMessage] = useState("");
    const [forgotSuccess, setForgotSuccess] = useState(false);


    // =========================
    // SAVE AUTH DATA
    // =========================

    const saveAuthData = (response) => {

        const token = response.data.token;

        if (!token) {
            throw new Error("No token received from server");
        }

        localStorage.setItem("token", token);

        if (response.data.user) {

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

        }

        window.dispatchEvent(
            new Event("authChange")
        );

    };


    // =========================
    // NORMAL LOGIN
    // =========================

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim() || !password) {

            alert("Please enter email and password");
            return;

        }

        try {

            setLoading(true);

            const response = await login({

                email: email.trim(),
                password

            });

            saveAuthData(response);

            navigate("/dashboard", {
                replace: true
            });

        } catch (error) {

            console.error("Login error:", error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // GOOGLE LOGIN
    // =========================

    const handleGoogleSuccess = async (
        credentialResponse
    ) => {

        if (!credentialResponse?.credential) {

            alert("Google login failed");
            return;

        }

        try {

            setLoading(true);

            const response = await googleLogin(
                credentialResponse.credential
            );

            saveAuthData(response);

            navigate("/dashboard", {
                replace: true
            });

        } catch (error) {

            console.error(
                "Google login error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Google login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // FORGOT PASSWORD
    // =========================

    const handleForgotPassword = async (e) => {

        e.preventDefault();

        const trimmedEmail = forgotEmail.trim();

        if (!trimmedEmail) {

            setForgotMessage(
                "Please enter your email address"
            );

            setForgotSuccess(false);

            return;

        }

        try {

            setForgotLoading(true);
            setForgotMessage("");
            setForgotSuccess(false);

            const response = await forgotPassword(
                trimmedEmail
            );

            setForgotMessage(
                response.data?.message ||
                "If an account exists with this email, a password reset link has been sent."
            );

            setForgotSuccess(true);

        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            setForgotMessage(
                error.response?.data?.message ||
                "Unable to process your request. Please try again."
            );

            setForgotSuccess(false);

        } finally {

            setForgotLoading(false);

        }

    };


    // =========================
    // OPEN FORGOT PASSWORD
    // =========================

    const openForgotPassword = () => {

        if (email.trim()) {

            setForgotEmail(email.trim());

        }

        setForgotMessage("");
        setForgotSuccess(false);
        setForgotMode(true);

    };


    // =========================
    // BACK TO LOGIN
    // =========================

    const backToLogin = () => {

        setForgotMode(false);
        setForgotMessage("");
        setForgotSuccess(false);

    };


    return (

        <AuthShell

            title="Welcome Back 👋"

            subtitle="Continue your journey toward your dream job."

            image={career}

        >

            <div className="auth-card">

                {forgotMode ? (

                    // =========================
                    // FORGOT PASSWORD SCREEN
                    // =========================

                    <>

                        <h2>Forgot Password 🔐</h2>

                        <p className="auth-subtitle">

                            Enter your registered email address
                            and we'll send you a password reset link.

                        </p>


                        <form
                            onSubmit={handleForgotPassword}
                        >

                            <div className="input-group">

                                <FaEnvelope />

                                <input

                                    type="email"

                                    placeholder="Email"

                                    value={forgotEmail}

                                    onChange={(e) =>
                                        setForgotEmail(
                                            e.target.value
                                        )
                                    }

                                    required

                                    autoComplete="email"

                                />

                            </div>


                            <button

                                type="submit"

                                className="login-btn"

                                disabled={forgotLoading}

                            >

                                {forgotLoading
                                    ? "Sending..."
                                    : "Send Reset Link"}

                            </button>

                        </form>


                        {forgotMessage && (

                            <p

                                className={
                                    forgotSuccess
                                        ? "forgot-message success"
                                        : "forgot-message"
                                }

                            >

                                {forgotMessage}

                            </p>

                        )}


                        <button

                            type="button"

                            className="back-to-login"

                            onClick={backToLogin}

                        >

                            ← Back to Login

                        </button>

                    </>

                ) : (

                    // =========================
                    // NORMAL LOGIN SCREEN
                    // =========================

                    <>

                        <h2>Welcome Back</h2>

                        <p className="auth-subtitle">

                            Login to continue managing your job applications.

                        </p>


                        <form onSubmit={handleLogin}>

                            {/* EMAIL */}

                            <div className="input-group">

                                <FaEnvelope />

                                <input

                                    type="email"

                                    placeholder="Email"

                                    value={email}

                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }

                                    required

                                    autoComplete="email"

                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="input-group">

                                <FaLock />

                                <input

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Password"

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }

                                    required

                                    autoComplete="current-password"

                                />


                                <button

                                    type="button"

                                    className="show-password-btn"

                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }

                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }

                                >

                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>


                            {/* FORGOT PASSWORD */}

                            <div className="login-options">

                                <span></span>

                                <button

                                    type="button"

                                    className="forgot-password"

                                    onClick={
                                        openForgotPassword
                                    }

                                >

                                    Forgot Password?

                                </button>

                            </div>


                            {/* LOGIN BUTTON */}

                            <button

                                type="submit"

                                className="login-btn"

                                disabled={loading}

                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"}

                            </button>

                        </form>


                        {/* DIVIDER */}

                        <div className="or-divider">

                            OR

                        </div>


                        {/* GOOGLE LOGIN */}

                        <div className="google-login-wrapper">

                            <GoogleLogin

                                onSuccess={
                                    handleGoogleSuccess
                                }

                                onError={() => {

                                    console.error(
                                        "Google login failed"
                                    );

                                    alert(
                                        "Google login failed"
                                    );

                                }}

                                theme="outline"

                                size="large"

                                width="420"

                            />

                        </div>


                        {/* SIGNUP */}

                        <p className="switch-auth">

                            Don't have an account?{" "}

                            <Link to="/signup">

                                Signup

                            </Link>

                        </p>

                    </>

                )}

            </div>

        </AuthShell>

    );

}


export default Login;