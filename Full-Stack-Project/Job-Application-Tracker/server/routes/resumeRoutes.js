import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {

    uploadResume,

    getResumes,
    deleteResume

} from "../controllers/resumeController.js";


const router = express.Router();


// UPLOAD ONE RESUME

router.post(

    "/",

    protect,

    upload.single("resume"),

    uploadResume

);


// GET CURRENT USER'S RESUMES

router.get(

    "/",

    protect,

    getResumes

);

router.delete(

    "/:id",

    protect,

    deleteResume

);


export default router;