import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { createJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, createJob);

export default router;