
import { check } from "express-validator"
export const RegisterSchema = [
    check("name").trim().isAlpha().withMessage("Name Should be Alphabate only"),
    check('username', 'username is required').exists().isAlphanumeric().withMessage('username should be alphanumeric character only ').trim().isLength({ min: 6, max: 32 }),
    check('email', 'email is required').exists().isEmail().withMessage('email is not valid').normalizeEmail(),
    check('password', 'password is required').exists().isLength({ min: 6, max: 32 }).trim(),
]