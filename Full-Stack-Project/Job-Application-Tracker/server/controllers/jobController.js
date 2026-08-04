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