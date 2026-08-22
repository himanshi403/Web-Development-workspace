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
    FaGithub
} from "react-icons/fa";

import {
    login,
    googleLogin
} from "../services/authService";


function AuthModal({
    closeModal
}) {

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

    const navigate =
        useNavigate();


    useEffect(() => {

        function handleEscape(e) {

            if (
                e.key === "Escape"
            ) {

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
                !email ||
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
                        email,
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
       GOOGLE LOGIN
    ========================= */

    const handleGoogleSuccess =
        async (
            credentialResponse
        ) => {

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


    return (

        <div
            className="modal-overlay"

            onClick={
                closeModal
            }
        >

            <div
                className="auth-modal"

                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <button
                    className="close-modal"

                    onClick={
                        closeModal
                    }
                >

                    ✖

                </button>


                <h2>

                    Welcome Back 👋

                </h2>


                <form
                    onSubmit={
                        handleLogin
                    }
                >

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

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

                    />


                    <button

                        type="button"

                        className="show-password"

                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }

                    >

                        {
                            showPassword
                                ? "🙈 Hide Password"
                                : "👁 Show Password"
                        }

                    </button>


                    <label
                        className="remember-me"
                    >

                        <input
                            type="checkbox"
                        />

                        Remember Me

                    </label>


                    <p
                        className="forgot-password"
                    >

                        Forgot Password?

                    </p>


                    <button

                        type="submit"

                        className="login-btn"

                        disabled={
                            loading
                        }

                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>

                </form>


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


                <div
                    className="social-login"
                >

                    <div
                        className="google-login-wrapper"
                    >
                        

                        <GoogleLogin
                        

                            onSuccess={
                                handleGoogleSuccess
                            }

                            onError={() => {

                                alert(
                                    "Google login failed"
                                );

                            }}

                            theme="outline"

                            size="large"

                            width="420"

                        />

                    </div>


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