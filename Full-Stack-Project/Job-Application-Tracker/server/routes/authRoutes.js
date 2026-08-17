import express from "express";

import {

    testAuth,
    register,
    login,
    getMe,
    updateProfile

} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import validationMiddleware from "../middleware/validationMiddleware.js";

import {

    validateRegister,
    validateLogin

} from "../validators/authValidator.js";


const router = express.Router();


router.get("/test", testAuth);


router.get(
    "/me",
    protect,
    getMe
);

router.put(
    "/me",
    protect,
    updateProfile
);


router.put(
    "/profile",
    protect,
    updateProfile
);


router.post(
    "/register",
    validateRegister,
    validationMiddleware,
    register
);


router.post(
    "/login",
    validateLogin,
    validationMiddleware,
    login
);


export default router;