import { body } from 'express-validator';

export const validateRegistration = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
    // Add more validation rules as needed
];

export const validateLogin = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
];
