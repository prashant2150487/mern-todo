import { validationResult } from "express-validator"
import User from "../models/User.js";
import { jsonGenerator } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, statusCode } from "../utils/constrants.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
const Login = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY, "Username or password is incorrect"))
        }
        const verified = bcrypt.compareSync(password, user.password);
        if (!verified) {
            return res.json(jsonGenerator(statusCode.UNPROCESSABLE_ENTITY, "Username or password is incorrect"))
        }
        const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);
        return res.json(jsonGenerator(statusCode.SUCCESS, "Login Successfull", { userId: user._id, token: token }))

    }
    res.json(jsonGenerator(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped))
}

export default Login