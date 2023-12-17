import { body, validationResult } from "express-validator";

export const registrationValidation = [
    body("username").trim().notEmpty().isLength({min: 5}).escape().withMessage("Username should have at least 5 characters"), //sanitizer "escape" transforms special HTML characters with others that can be represented as text.
    body("password").notEmpty().isLength({min: 5}).withMessage("Password should have at least 5 characters"),
    body("email").trim().notEmpty().isEmail().normalizeEmail(),
    body("consent").notEmpty()
];

export const validateRegistration = (req, res, next) => {
    registrationValidation.forEach((validation) => validation(req, res, () => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
    
        next();
    }));
};