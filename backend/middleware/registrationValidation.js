import { body } from "express-validator";

export const registrationValidation = [
    body("username").trim().notEmpty().isLength({min: 5}).escape(), //sanitizer "escape" transforms special HTML characters with others that can be represented as text.
    body("password").notEmpty().isLength({min: 6}),
    body("email").trim().notEmpty().isEmail().normalizeEmail()
]