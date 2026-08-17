import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { validateJob } from "../validators/jobValidator.js";

import validationMiddleware from "../middleware/validationMiddleware.js";


import { 
    createJob,
    getJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    deleteAllJobs,
    getJobStats,
    restoreJob

 } from "../controllers/jobController.js";

const router = express.Router();

router.post(
    "/",
    protect,
    validateJob,
    validationMiddleware,
    createJob
);
router.get("/", protect, getJobs);
router.get("/stats",protect,getJobStats);
router.post("/restore", protect, restoreJob);
router.get("/:id", protect, getSingleJob);
router.delete("/all", protect, deleteAllJobs);
router.delete("/:id", protect, deleteJob);
router.put("/:id", protect, validateJob, validationMiddleware, updateJob);


export default router;