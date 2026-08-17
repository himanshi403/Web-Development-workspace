import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(

    {
        fileName: {

            type: String,

            required: true

        },

        filePath: {

            type: String,

            required: true

        },

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        }

    },

    {
        timestamps: true
    }

);


const Resume = mongoose.model(
    "Resume",
    resumeSchema
);


export default Resume;