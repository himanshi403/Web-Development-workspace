import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getJobStats } from "../controllers/jobController.js";

import { 
    createJob,
    getJobs,
    getSingleJob,

 } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.get("/stats",protect,getJobStats);
router.get("/:id", protect, getSingleJob);


export default router;