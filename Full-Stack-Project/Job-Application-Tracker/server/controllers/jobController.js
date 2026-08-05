import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";

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

        res.status(201).json({

            success: true,

            message: "Job Created Successfully",

            job

        });

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

        res.status(200).json({

           success:true,

           jobs,

           totalJobs,

           page,

           pages:Math.ceil(totalJobs/limit)
        });

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

        res.status(200).json({

            success: true,

            job

        });

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

        res.status(200).json({

            success: true,
            message: "Job Updated Successfully",
            job

        });

    });

    


// ================= DELETE JOB =================

export const deleteJob = asyncHandler(async (req,res)=>{

        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({

                success: false,
                message: "Job not found"

            });

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

res.json({

success:true,

stats:defaultStats

});

});



