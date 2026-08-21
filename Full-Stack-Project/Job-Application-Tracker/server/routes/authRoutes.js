import express from "express";

import {

    
    register,
    login,
    googleAuth,
    getMe,
    updateProfile,
    testAuth

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
router.post(
    "/google",
    googleAuth
);


export default router;