import { validationResult } from "express-validator"
import { jsonGenerator } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, statusCode } from "../utils/constrants.js";
import bcrypt from "bcrypt"
import User from "../models/User.js";
import Jwt from "jsonwebtoken"
const Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(jsonGenerator(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()))
    }

    if (errors.isEmpty()) {
        const { name, email, password, username } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const userExist = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (userExist) {
            return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY, "User or email exist"))
        }
        //save to db
        try {
            const result = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                username: username
            })
            const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

            return res.json(jsonGenerator(statusCode.SUCCESS, "Registration is successfull", { userId: result._id, token: token }))
        } catch (error) {
            console.log(error)
        }
    }


    res.json(jsonGenerator(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()))
}
export default Register