import express from "express";

import {

testAuth,
register,
login,
getMe

} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/me", protect, getMe);
router.get("/test", testAuth);

import validationMiddleware from "../middleware/validationMiddleware.js";
import {
    validateRegister,
    validateLogin
} from "../validators/authValidator.js";
router.post("/login", login);

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