import { body } from "express-validator";

export const validateJob = [

    body("company")
        .trim()
        .notEmpty()
        .withMessage("Company is required"),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required"),

    body("status")
        .isIn([
            "Applied",
            "Interview",
            "Offer",
            "Rejected"
        ])
        .withMessage("Invalid Status")

];