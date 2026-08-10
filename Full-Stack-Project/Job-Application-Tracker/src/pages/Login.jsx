import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/AuthShell";
import career from "../assets/career.svg";

import { login } from "../services/authService";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();


        if (!email || !password) {

            alert(
                "Please enter email and password"
            );

            return;

        }


        try {

            setLoading(true);

            console.log(
                "Sending login request..."
            );


            const response =
                await login({
                    email,
                    password
                });


            console.log(
                "Login response:",
                response.data
            );


            const token =
                response.data.token;


            if (!token) {

                console.error(
                    "Login succeeded but backend did not return a token."
                );

                alert(
                    "Login failed: No token received from server."
                );

                return;

            }


            // =================================================
            // SAVE AUTH DATA
            // =================================================

            localStorage.setItem(
                "token",
                token
            );


            if (response.data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );

            }


            console.log(
                "Token stored:",
                localStorage.getItem(
                    "token"
                )
            );


            console.log(
                "User stored:",
                localStorage.getItem(
                    "user"
                )
            );


            // =================================================
            // IMPORTANT
            // Tell App.jsx that a new user logged in.
            // =================================================

            window.dispatchEvent(
                new Event("authChange")
            );


            // Go to dashboard AFTER auth data is stored.

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Login failed"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <AuthShell

            title="Welcome Back 👋"

            subtitle={
                "Continue your journey toward your dream job."
            }

            image={career}

        >

            <form
                onSubmit={handleLogin}
            >

                {/* EMAIL */}

                <div className="input-group">

                    <span>
                        📧
                    </span>

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

                </div>


                {/* PASSWORD */}

                <div className="input-group">

                    <span>
                        🔒
                    </span>

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

                        className="show-password-btn"

                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }

                    >

                        {
                            showPassword
                                ? "Hide"
                                : "Show"
                        }

                    </button>

                </div>


                {/* LOGIN */}

                <button

                    type="submit"

                    className="login-btn"

                    disabled={loading}

                >

                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

            </form>


            <div className="or-divider">
                OR
            </div>


            <button

                type="button"

                className="google-btn"

            >

                Continue with Google

            </button>


            <p>

                Don't have an account?

                {" "}

                <Link to="/signup">

                    Signup

                </Link>

            </p>


        </AuthShell>

    );

}


export default Login;