import Job from "../models/Job.js";

export const createJob = async (req, res) => {

    try {

        const {

            company,
            role,
            status,
            interviewDate

        } = req.body;

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

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getJobs = async (req, res) => {

    try {

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

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


export const getSingleJob = async (req, res) => {

    try {

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

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getJobStats = async (req,res)=>{

try{

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

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

