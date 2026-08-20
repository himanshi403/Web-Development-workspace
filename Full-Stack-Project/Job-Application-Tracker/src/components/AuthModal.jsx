import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthModal({ closeModal }) {

    const [isLogin, setIsLogin] =
        useState(true);

    const [showPassword, setShowPassword] =
        useState(false);

    const navigate = useNavigate();


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

                <button
                    className="close-modal"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    ✕
                </button>


                <h2>
                    {isLogin
                        ? "Welcome Back 👋"
                        : "Create Account 🚀"}
                </h2>


                <input
                    type="email"
                    placeholder="Email"
                />


                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Password"
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
                    {showPassword
                        ? "🙈 Hide Password"
                        : "👁 Show Password"}
                </button>


                <label className="remember-me">

                    <input
                        type="checkbox"
                        className="custom-checkbox"
                    />

                    Remember Me

                </label>


                <p className="forgot-password">
                    Forgot Password?
                </p>


                <button
                    type="button"
                    className="login-btn"
                    onClick={() => {

                        /*
                         For now this is only UI navigation.
                         Actual login API integration
                         can be connected here later.
                        */

                        navigate("/dashboard");

                        closeModal();

                    }}
                >

                    {isLogin
                        ? "Login"
                        : "Create Account"}

                </button>


                <div className="auth-switch">

                    {isLogin ? (

                        <p>

                            Don't have an account?{" "}

                            <span
                                onClick={() => {

                                    closeModal();

                                    navigate("/signup");

                                }}
                            >

                                Signup

                            </span>

                        </p>

                    ) : (

                        <p>

                            Already have an account?{" "}

                            <span
                                onClick={() =>
                                    setIsLogin(true)
                                }
                            >

                                Login

                            </span>

                        </p>

                    )}

                </div>


                <div className="social-login">

                    <button type="button">
                        🔵 Continue with Google
                    </button>

                    <button type="button">
                        ⚫ Continue with GitHub
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AuthModal;