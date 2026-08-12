import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    successResponse
} from "../utils/apiResponse.js";


// CREATE JOB 

export const createJob = asyncHandler(async (req, res) => {

    const {
        company,
        role,
        status,
        interviewDate,
        notes
    } = req.body;

    // Validation
    if (!company || !role) {

        const error = new Error("Company and Role are required");

        error.statusCode = 400;

        throw error;
    }

    // Create job
    const job = await Job.create({

        company,
        role,
        status,
        interviewDate,
        notes,
        user: req.user.id

    });

    successResponse(
        res,
        201,
        "Job Created Successfully",
        {
            job
        }
    );

});


// ================= GET ALL JOBS =================

export const getJobs = asyncHandler(async (req, res) => {

    const {
        search,
        status,
        sort
    } = req.query;


    // Every user can only see their own jobs
    let query = {

        user: req.user.id

    };


    // ================= SEARCH =================

    if (search) {

        query.company = {

            $regex: search,
            $options: "i"

        };

    }


    // ================= STATUS FILTER =================

    if (status && status !== "All") {

        query.status = status;

    }


    // ================= SORT =================

    let jobsQuery = Job.find(query);


    if (sort === "oldest") {

        jobsQuery = jobsQuery.sort({

            createdAt: 1

        });

    }

    else if (sort === "company") {

        jobsQuery = jobsQuery.sort({

            company: 1

        });

    }

    else {

        // newest by default

        jobsQuery = jobsQuery.sort({

            createdAt: -1

        });

    }


    // ================= PAGINATION =================

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;


    const jobs = await jobsQuery
        .skip(skip)
        .limit(limit);


    // Total number of jobs matching the query
    const totalJobs = await Job.countDocuments(query);


    
    const pages = Math.ceil(totalJobs / limit);


    successResponse(

        res,

        200,

        "Jobs fetched successfully",

        {

            jobs,

            totalJobs,

            page,

            pages

        }

    );

});


// ================= GET SINGLE JOB =================

export const getSingleJob = asyncHandler(async (req, res) => {

    const job = await Job.findOne({

        _id: req.params.id,

        user: req.user.id

    });


    if (!job) {

        const error = new Error("Job not found");

        error.statusCode = 404;

        throw error;

    }


    successResponse(

        res,

        200,

        "Job fetched successfully",

        {

            job

        }

    );

});


// ================= UPDATE JOB =================

export const updateJob = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id);


    if (!job) {

        const error = new Error("Job not found");

        error.statusCode = 404;

        throw error;

    }


     // Ownership check
    if (
        job.user.toString() !==
        req.user.id.toString()
    ) {

        const error = new Error(
            "Unauthorized"
        );

        error.statusCode = 403;

        throw error;
    }

    const {
        company,
        role,
        status,
        interviewDate,
        notes
    } = req.body;

    if (!company || !role) {

        const error = new Error(
            "Company and Role are required"
        );

        error.statusCode = 400;

        throw error;
    }

  job.company = company || job.company;
job.role = role || job.role;
job.status = status || job.status;

   if (interviewDate !== undefined) {
    job.interviewDate = interviewDate;
}

if (notes !== undefined) {
    job.notes = notes;
}

    await job.save();

    successResponse(
        res,
        200,
        "Job Updated Successfully",
        {
            job
        }
    );

});



// DELETE JOB

export const deleteJob = asyncHandler(async (req, res) => {

    const job = await Job.findById(req.params.id);


    if (!job) {

        const error = new Error("Job not found");

        error.statusCode = 404;

        throw error;

    }


    // OWNERSHIP CHECK 

    if (
        job.user.toString() !== req.user.id.toString()
    ) {

        const error = new Error("Unauthorized");

        error.statusCode = 403;

        throw error;

    }


    await job.deleteOne();


    successResponse(

        res,

        200,

        "Job Deleted Successfully"

    );

});

// ================= RESTORE DELETED JOB =================

export const restoreJob = asyncHandler(async (req, res) => {

    const {
        company,
        role,
        status,
        interviewDate,
        createdAt
    } = req.body;

    if (!company || !role) {

        const error = new Error(
            "Company and Role are required"
        );

        error.statusCode = 400;

        throw error;
    }

    const restoredJob = await Job.create({

        company,

        role,

        status: status || "Applied",

        interviewDate: interviewDate || undefined,

        user: req.user.id,

        createdAt: createdAt || new Date()

    });

    successResponse(

        res,

        201,

        "Job restored successfully",

        {
            job: restoredJob
        }

    );

});


// JOB STATISTICS 

export const getJobStats = asyncHandler(async (req, res) => {

    const stats = await Job.aggregate([

        {
            $match: {

                user: req.user._id

            }

        },

        {
            $group: {

                _id: "$status",

                count: {
                    $sum: 1
                }

            }

        }

    ]);


    const defaultStats = {

        Applied: 0,

        Interview: 0,

        Offer: 0,

        Rejected: 0

    };


    stats.forEach(item => {

        defaultStats[item._id] = item.count;

    });


    successResponse(

        res,

        200,

        "Statistics fetched",

        {

            stats: defaultStats

        }

    );

});