import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import nodemailer from "nodemailer";

import {
    successResponse
} from "../utils/apiResponse.js";






export const forgotPassword = async (
    req,
    res
) => {

    try {

        const { email } = req.body;


        if (!email) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter your email address"

            });

        }


        const user =
            await User.findOne({ email });


        /*
        Security:
        Do not reveal whether an email exists.
        */

        if (!user) {

            return res.status(200).json({

                success: true,

                message:
                    "If an account exists with this email, a password reset link has been sent."

            });

        }


        /*
        Generate raw token
        */

        const resetToken =
            crypto
                .randomBytes(32)
                .toString("hex");


        /*
        Store HASHED token
        */

        user.resetPasswordToken =
            crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");


        /*
        Token expires in 15 minutes
        */

        user.resetPasswordExpires =
            Date.now() +
            15 * 60 * 1000;


        await user.save();


        const resetURL =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;


        const transporter =
            nodemailer.createTransport({

                service: "Gmail",

                auth: {

                    user:
                        process.env.SMTP_USER,

                    pass:
                        process.env.SMTP_PASS

                }

            });


        await transporter.sendMail({

            from:
                `"JobTracker" <${process.env.SMTP_USER}>`,

            to:
                user.email,

            subject:
                "Reset your JobTracker password",

            html: `
                <div
                    style="
                        font-family: Arial;
                        padding: 30px;
                    "
                >

                    <h2>
                        Reset your password
                    </h2>

                    <p>
                        We received a request to reset your JobTracker password.
                    </p>

                    <a
                        href="${resetURL}"
                        style="
                            display: inline-block;
                            padding: 12px 22px;
                            background: #4f46e5;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: bold;
                        "
                    >
                        Reset Password
                    </a>

                    <p
                        style="
                            margin-top: 20px;
                            color: #64748b;
                        "
                    >
                        This link expires in 15 minutes.
                    </p>

                </div>
            `

        });


        return res.status(200).json({

            success: true,

            message:
                "If an account exists with this email, a password reset link has been sent."

        });


    } catch (error) {

        console.error(
            "Forgot password error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to process password reset request"

        });

    }

};


export const resetPassword = async (
    req,
    res
) => {

    try {

        const {
            token
        } = req.params;


        const {
            password
        } = req.body;


        if (!password) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a new password"

            });

        }


        if (
            password.length < 6
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters"

            });

        }


        const hashedToken =
            crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");


        const user =
            await User.findOne({

                resetPasswordToken:
                    hashedToken,

                resetPasswordExpires:
                    {
                        $gt: Date.now()
                    }

            });


        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "This password reset link is invalid or has expired"

            });

        }

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
    password,
    salt
);

user.password = hashedPassword;

user.resetPasswordToken = undefined;

user.resetPasswordExpires = undefined;

await user.save();

        return res.status(200).json({

            success: true,

            message:
                "Password reset successfully. You can now log in."

        });


    } catch (error) {

        console.error(
            "Reset password error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to reset password"

        });

    }

};


/* =================================================
   GOOGLE OAUTH CLIENT
================================================= */

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);


/* =================================================
   TEST AUTH
================================================= */

export const testAuth = (req, res) => {

    successResponse(
        res,
        200,
        "Auth Controller Working ✅"
    );

};


/* =================================================
   NORMAL REGISTER
================================================= */

export const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }


        const salt =
            await bcrypt.genSalt(10);


        const hashedPassword =
            await bcrypt.hash(password, salt);


        const user =
            await User.create({
                name,
                email,
                password: hashedPassword
            });


        const createdUser =
            await User.findById(user._id)
                .select("-password");


        successResponse(
            res,
            201,
            "User Registered Successfully",
            {
                user: createdUser
            }
        );

    }

    catch (error) {

        console.error(
            "Registration error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/* =================================================
   GOOGLE AUTH
================================================= */

export const googleAuth = async (req, res) => {

    try {

        const {
            credential
        } = req.body;


        if (!credential) {

            return res.status(400).json({
                success: false,
                message:
                    "Google credential is required"
            });

        }


        const ticket =
            await googleClient.verifyIdToken({

                idToken: credential,

                audience:
                    process.env.GOOGLE_CLIENT_ID

            });


        const payload =
            ticket.getPayload();


        const {
            sub,
            email,
            name,
            picture,
            email_verified
        } = payload;


        if (!email_verified) {

            return res.status(401).json({
                success: false,
                message:
                    "Google email is not verified"
            });

        }


        let user =
            await User.findOne({
                email
            });


        /* Create user if first Google login */

        if (!user) {

            user =
                await User.create({

                    name,

                    email,

                    googleId: sub,

                    profileImage:
                        picture || ""

                });

        }


        const token =
            jwt.sign(

                {
                    id: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        return res.status(200).json({

            success: true,

            message:
                "Google authentication successful",

            token,

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                profileImage:
                    user.profileImage || ""

            }

        });

    }

    catch (error) {

        console.error(
            "Google authentication error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};


/* =================================================
   NORMAL LOGIN
================================================= */

export const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill all fields"
            });

        }


        const user =
            await User.findOne({
                email
            });


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found"
            });

        }


        /* Google-only account */

        if (!user.password) {

            return res.status(400).json({
                success: false,
                message:
                    "This account uses Google Sign-In. Please continue with Google."
            });

        }


        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid credentials"
            });

        }


        const token =
            jwt.sign(

                {
                    id:
                        user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "7d"
                }

            );


        successResponse(
            res,
            200,
            "Login Successful",
            {

                token,

                user: {

                    id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            }
        );

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};


/* =================================================
   GET CURRENT USER
================================================= */

export const getMe = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found"
            });

        }


        successResponse(
            res,
            200,
            "Profile fetched successfully",
            {
                user
            }
        );

    }

    catch (error) {

        console.error(
            "Get profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};


/* =================================================
   UPDATE PROFILE
================================================= */

export const updateProfile = async (req, res) => {

    try {

        const {
            name,
            email,
            role,
            location,
            about,
            goal
        } = req.body;


        const user =
            await User.findById(
                req.user.id
            );


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found"
            });

        }


        if (name !== undefined) {

            user.name = name;

        }


        if (email !== undefined) {

            const existingUser =
                await User.findOne({

                    email,

                    _id: {
                        $ne:
                            user._id
                    }

                });


            if (existingUser) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email already registered"
                });

            }


            user.email = email;

        }


        if (role !== undefined) {

            user.role = role;

        }


        if (location !== undefined) {

            user.location = location;

        }


        if (about !== undefined) {

            user.about = about;

        }


        if (goal !== undefined) {

            user.goal = goal;

        }


        await user.save();


        const updatedUser =
            await User.findById(
                user._id
            ).select("-password");


        successResponse(
            res,
            200,
            "Profile updated successfully",
            {
                user:
                    updatedUser
            }
        );

    }

    catch (error) {

        console.error(
            "Update profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};