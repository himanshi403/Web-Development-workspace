import Resume from "../models/Resume.js";

import asyncHandler from "../utils/asyncHandler.js";

import {
    successResponse
} from "../utils/apiResponse.js";


// =========================================================
// UPLOAD RESUME
// =========================================================

export const uploadResume = asyncHandler(
    async (req, res) => {

        if (!req.file) {

            const error = new Error(
                "Please upload a PDF resume"
            );

            error.statusCode = 400;

            throw error;

        }


        const resume = await Resume.create({

            fileName:
                req.file.originalname,

            filePath:
                req.file.path,

            user:
                req.user.id

        });


        successResponse(

            res,

            201,

            "Resume uploaded successfully",

            {

                resume

            }

        );

    }
);


// =========================================================
// GET CURRENT USER'S RESUMES
// =========================================================

export const getResumes = asyncHandler(
    async (req, res) => {

        const resumes = await Resume.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });


        successResponse(

            res,

            200,

            "Resumes fetched successfully",

            {

                resumes

            }

        );

    }
);