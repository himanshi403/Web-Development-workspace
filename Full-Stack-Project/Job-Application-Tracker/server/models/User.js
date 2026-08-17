import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        trim: true

    },

    email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true

    },

    password: {

        type: String,

        required: true,

        minlength: 6

    },

     role: {
            type: String,
            default: "Computer Science Student",
            trim: true
        },

        location: {
            type: String,
            default: "",
            trim: true
        },

         about: {
            type: String,
            default: "",
            trim: true
        },

        goal: {
            type: String,
            default: "",
            trim: true
        }

}, {

    timestamps: true

});

const User = mongoose.model("User", userSchema);

export default User;