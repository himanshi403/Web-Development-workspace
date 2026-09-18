
import {
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    GoogleLogin
} from "@react-oauth/google";

import {
    FaGithub,
    FaEye,
    FaEyeSlash,
    FaEnvelope,
    FaLock
} from "react-icons/fa";

import {
    login,
    googleLogin,
    forgotPassword
} from "../services/authService";


function AuthModal({
    closeModal
}) {

    /* =========================
       LOGIN STATES
    ========================= */

    const [
        email,
        setEmail
    ] = useState("");

    const [
        password,
        setPassword
    ] = useState("");

    const [
        showPassword,
        setShowPassword
    ] = useState(false);

    const [
        loading,
        setLoading
    ] = useState(false);


    /* =========================
       FORGOT PASSWORD STATES
    ========================= */

    const [
        forgotMode,
        setForgotMode
    ] = useState(false);

    const [
        forgotEmail,
        setForgotEmail
    ] = useState("");

    const [
        forgotLoading,
        setForgotLoading
    ] = useState(false);

    const [
        forgotMessage,
        setForgotMessage
    ] = useState("");

    const [
        forgotSuccess,
        setForgotSuccess
    ] = useState(false);


    const navigate =
        useNavigate();


    /* =========================
       ESCAPE KEY
    ========================= */

    useEffect(() => {

        function handleEscape(e) {

            if (e.key === "Escape") {
                closeModal();
            }

        }

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [closeModal]);


    /* =========================
       NORMAL LOGIN
    ========================= */

    const handleLogin =
        async (e) => {

            e.preventDefault();

            if (
                !email.trim() ||
                !password
            ) {

                alert(
                    "Please enter email and password"
                );

                return;

            }


            try {

                setLoading(true);


                const response =
                    await login({

                        email: email.trim(),

                        password

                    });


                const token =
                    response.data.token;


                localStorage.setItem(
                    "token",
                    token
                );


                if (
                    response.data.user
                ) {

                    localStorage.setItem(

                        "user",

                        JSON.stringify(
                            response.data.user
                        )

                    );

                }


                window.dispatchEvent(
                    new Event(
                        "authChange"
                    )
                );


                closeModal();


                navigate(
                    "/dashboard"
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                alert(

                    error.response?.data
                        ?.message ||

                    "Login failed"

                );


            } finally {

                setLoading(false);

            }

        };


    /* =========================
       FORGOT PASSWORD
    ========================= */

    const handleForgotPassword =
        async (e) => {

            e.preventDefault();


            const trimmedEmail =
                forgotEmail.trim();


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


                const response =
                    await forgotPassword(
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

                    error.response?.data
                        ?.message ||

                    "Unable to process your request. Please try again."

                );


                setForgotSuccess(false);


            } finally {

                setForgotLoading(false);

            }

        };


    /* =========================
       OPEN FORGOT PASSWORD
    ========================= */

    const openForgotPassword =
        () => {

            /*
             * If the user already entered
             * an email in the login form,
             * automatically use it in
             * the forgot-password form.
             */

            if (email.trim()) {

                setForgotEmail(
                    email.trim()
                );

            }


            setForgotMessage("");

            setForgotSuccess(false);

            setForgotMode(true);

        };


    /* =========================
       BACK TO LOGIN
    ========================= */

    const backToLogin =
        () => {

            setForgotMode(false);

            setForgotMessage("");

            setForgotSuccess(false);

        };


    /* =========================
       GOOGLE LOGIN
    ========================= */

    const handleGoogleSuccess =
        async (
            credentialResponse
        ) => {

            if (
                !credentialResponse?.credential
            ) {

                alert(
                    "Google login failed"
                );

                return;

            }


            try {

                setLoading(true);


                const response =
                    await googleLogin(

                        credentialResponse
                            .credential

                    );


                const token =
                    response.data.token;


                localStorage.setItem(
                    "token",
                    token
                );


                if (
                    response.data.user
                ) {

                    localStorage.setItem(

                        "user",

                        JSON.stringify(
                            response.data.user
                        )

                    );

                }


                window.dispatchEvent(
                    new Event(
                        "authChange"
                    )
                );


                closeModal();


                navigate(
                    "/dashboard"
                );


            } catch (error) {

                console.error(
                    "Google login error:",
                    error
                );


                alert(

                    error.response?.data
                        ?.message ||

                    "Google login failed"

                );


            } finally {

                setLoading(false);

            }

        };


    /* =================================================
       FORGOT PASSWORD SCREEN
    ================================================= */

    if (forgotMode) {

        return (

            <div
                className="modal-overlay"
                onClick={closeModal}
            >

                <div
                    className="auth-modal"
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >

                    {/* CLOSE */}

                    <button
                        type="button"
                        className="close-modal"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        ✖
                    </button>


                    {/* TITLE */}

                    <h2>
                        Forgot Password 🔐
                    </h2>


                    <p className="forgot-description">
                        Enter your registered email
                        address and we'll send you a
                        password reset link.
                    </p>


                    {/* FORGOT PASSWORD FORM */}

                    <form
                        onSubmit={
                            handleForgotPassword
                        }
                    >

                        {/* EMAIL */}

                        <div className="auth-input-wrapper">

                            <FaEnvelope
                                className="auth-input-icon"
                            />

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


                        {/* SEND RESET LINK */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={
                                forgotLoading
                            }
                        >

                            {forgotLoading
                                ? "Sending..."
                                : "Send Reset Link"}

                        </button>

                    </form>


                    {/* RESPONSE MESSAGE */}

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


                    {/* BACK TO LOGIN */}

                    <button
                        type="button"
                        className="back-to-login"
                        onClick={
                            backToLogin
                        }
                    >
                        ← Back to Login
                    </button>

                </div>

            </div>

        );

    }


    /* =================================================
       NORMAL LOGIN SCREEN
    ================================================= */

    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="auth-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* CLOSE BUTTON */}

                <button
                    type="button"
                    className="close-modal"
                    onClick={closeModal}
                    aria-label="Close"
                >
                    ✖
                </button>


                {/* TITLE */}

                <h2>
                    Welcome Back 👋
                </h2>


                {/* LOGIN FORM */}

                <form
                    onSubmit={handleLogin}
                >

                    {/* =====================
                       EMAIL
                    ====================== */}

                    <div className="auth-input-wrapper">

                        <FaEnvelope
                            className="auth-input-icon"
                        />

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


                    {/* =====================
                       PASSWORD
                    ====================== */}

                    <div
                        className="auth-input-wrapper password-wrapper"
                    >

                        <FaLock
                            className="auth-input-icon"
                        />

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


                        {/* SHOW / HIDE PASSWORD */}

                        <button
                            type="button"
                            className="password-toggle"
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

                            {showPassword ? (

                                <FaEyeSlash />

                            ) : (

                                <FaEye />

                            )}

                        </button>

                    </div>


                    {/* =====================
                       REMEMBER + FORGOT
                    ====================== */}

                    <div className="login-options">

                        <label
                            className="remember-me"
                        >

                            <input
                                type="checkbox"
                            />

                            <span>
                                Remember Me
                            </span>

                        </label>


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


                    {/* =====================
                       LOGIN BUTTON
                    ====================== */}

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


                {/* =====================
                   SIGNUP
                ====================== */}

                <p>

                    Don't have an account?

                    {" "}

                    <span
                        onClick={() => {

                            closeModal();

                            navigate(
                                "/signup"
                            );

                        }}
                    >
                        Signup
                    </span>

                </p>


                {/* =====================
                   SOCIAL LOGIN
                ====================== */}

                <div
                    className="social-login"
                >

                    {/* GOOGLE */}

                    <div
                        className="google-login-wrapper"
                    >

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


                    {/* GITHUB */}

                    <button
                        type="button"
                    >

                        <FaGithub />

                        Continue with GitHub

                    </button>

                </div>

            </div>

        </div>

    );

}


export default AuthModal;

