import express from "express"
import Register from "../controllers/Register.js";
import { RegisterSchema } from "../validatorSchema/RegisterSchema.js";
import Login from "../controllers/Login.js";
import { LoginSchema } from "../validatorSchema/LoginSchema.js";

const apiRoute = express.Router();


apiRoute.post("/register", RegisterSchema, Register)
apiRoute.post("/login", LoginSchema, Login)




export default apiRoute;