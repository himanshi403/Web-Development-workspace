
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { resetPassword } from "../services/authService";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            setMessageType("error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setMessageType("");

            const response = await resetPassword(token, password);

            setMessage(
                response.data.message ||
                "Password reset successfully!"
            );

            setMessageType("success");

            setTimeout(() => {
                navigate("/login");
            }, 1800);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to reset password. Please try again."
            );

            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-background">
                <div className="reset-glow reset-glow-one"></div>
                <div className="reset-glow reset-glow-two"></div>
            </div>

            <div className="reset-password-card">

                <div className="reset-icon">
                    <FaLock />
                </div>

                <div className="reset-heading">
                    <h1>Create New Password</h1>

                    <p>
                        Secure your account with a new password.
                        Choose something strong and memorable.
                    </p>
                </div>

                <form
                    className="reset-password-form"
                    onSubmit={handleSubmit}
                >

                    <div className="reset-input-group">
                        <label htmlFor="new-password">
                            New Password
                        </label>

                        <div className="reset-input-wrapper">
                            <FaLock className="reset-input-icon" />

                            <input
                                id="new-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="reset-password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="reset-input-group">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>

                        <div className="reset-input-wrapper">
                            <FaLock className="reset-input-icon" />

                            <input
                                id="confirm-password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="reset-password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="reset-password-hint">
                        <FaCheckCircle />
                        <span>
                            Use at least 6 characters.
                        </span>
                    </div>

                    {message && (
                        <div
                            className={`reset-message ${messageType}`}
                        >
                            {messageType === "success" && (
                                <FaCheckCircle />
                            )}

                            <span>{message}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="reset-submit-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"
                        }
                    </button>

                    <button
                        type="button"
                        className="reset-back-btn"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>

                </form>

                <p className="reset-footer">
                    Your security matters to us.
                </p>

            </div>
        </div>
    );
}

export default ResetPassword;