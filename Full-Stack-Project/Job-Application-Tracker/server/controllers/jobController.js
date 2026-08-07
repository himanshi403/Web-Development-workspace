import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";

import {

successResponse,

errorResponse

} from "../utils/apiResponse.js";

export const createJob = asyncHandler(async (req, res) => {


        const {

            company,
            role,
            status,
            interviewDate

        } = req.body;
        if(!company || !role){

const error = new Error("Company and Role are required");

error.statusCode = 400;

throw error;

}

        const job = await Job.create({

            company,

            role,

            status,

            interviewDate,

            user: req.user.id

        });

       successResponse(

    res,

    201,

    "Job Created Successfully",

    { job }

);

    });

   

export const getJobs = asyncHandler(async (req,res)=>{

   

        const { search, status, sort } = req.query;

        let query = {

            user: req.user.id

        };

        if (search) {

            query.company = {

                $regex: search,//contains
                $options: "i"//ignore upper lowercase

            };

        }

        if (status && status !== "All") {

            query.status = status;

        }

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

            jobsQuery = jobsQuery.sort({

                createdAt: -1

            });

        }

const page = Number(req.query.page) || 1;

const limit = Number(req.query.limit) || 10;

const skip = (page - 1) * limit;

const jobs = await jobsQuery
.skip(skip)
.limit(limit);

const totalJobs = await Job.countDocuments(query);

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

   


export const getSingleJob = asyncHandler(async (req, res) => {

    

        const job = await Job.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Job not found"

            });

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

export const updateJob = asyncHandler(async (req,res)=>{

    

        const job = await Job.findById(req.params.id);

        if (!job) {

           const error = new Error("Job not found");

            error.statusCode = 404;

            throw error;

        }

        // Ownership Check

        if (job.user.toString() !== req.user.id.toString()) {

          const error = new Error("Unauthorized");

           error.statusCode = 403;

           throw error;

        }

        const {

            company,
            role,
            status,
            interviewDate

        } = req.body;
        if(!company || !role){

const error = new Error("Company and Role are required");

error.statusCode = 400;

throw error;

}

        job.company = company || job.company;
        job.role = role || job.role;
        job.status = status || job.status;
        job.interviewDate = interviewDate || job.interviewDate;

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

    


// ================= DELETE JOB =================

export const deleteJob = asyncHandler(async (req,res)=>{

        const job = await Job.findById(req.params.id);

        if (!job) {

           successResponse(

            res,

            200,

            "Job Deleted Successfully"

          );

        }

        // Ownership Check

        if (job.user.toString() !== req.user.id.toString()) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized"

            });

        }

        await job.deleteOne();

        res.status(200).json({

            success: true,
            message: "Job Deleted Successfully"

        });

    });

   

export const getJobStats = asyncHandler(async (req,res)=>{



const stats=await Job.aggregate([

{

$match:{

user:req.user._id

}

},

{

$group:{

_id:"$status",

count:{$sum:1}

}

}

]);

let defaultStats={

Applied:0,

Interview:0,

Offer:0,

Rejected:0

};

stats.forEach(item=>{

defaultStats[item._id]=item.count;

});

successResponse(

res,

200,

"Statistics fetched",

{

stats:defaultStats

}

);

});



