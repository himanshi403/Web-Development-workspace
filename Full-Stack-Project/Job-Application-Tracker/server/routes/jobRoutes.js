import express from "express";

import { protect } from "../middleware/authMiddleware.js";


import { 
    createJob,
    getJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getJobStats

 } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.get("/stats",protect,getJobStats);
router.get("/:id", protect, getSingleJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);


export default router;