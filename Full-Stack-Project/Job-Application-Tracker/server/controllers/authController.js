import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    successResponse
} from "../utils/apiResponse.js";

export const testAuth = (req, res) => {

    successResponse(

        res,

        200,

        "Auth Controller Working ✅"

    );

};

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please fill all fields"

            });

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email already registered"

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        const createdUser = await User.findById(user._id).select("-password");

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

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please fill all fields"

            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid credentials"

            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        successResponse(

            res,

            200,

            "Login Successful",

            {

                token,

                user: {

                    id: user._id,
                    name: user.name,
                    email: user.email

                }

            }

        );

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const getMe = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

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

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};