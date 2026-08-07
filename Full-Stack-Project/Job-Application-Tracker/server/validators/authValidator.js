import { body } from "express-validator";

export const validateRegister = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];

export const validateLogin = [

    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password required")

];