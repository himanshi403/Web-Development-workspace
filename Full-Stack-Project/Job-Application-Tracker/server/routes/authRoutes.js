import express from "express";

import {

testAuth,
register,
login,
getProfile,
getMe

} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/me", protect, getMe);
router.get("/test", testAuth);

router.post("/register", register);
router.post("/login", login);

export default router;