import express from "express";
import apiRoute from "./routes/api.js";
import mongoose from "mongoose"
import dotenv from 'dotenv';
import { DB_CONNECT } from "./utils/constrants.js"

dotenv.config();
const app = express();
const PORT = 8000;




mongoose.connect(DB_CONNECT)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());





app.use('/api/', apiRoute)

app.listen(PORT, () => console.log("server is running on" + 8000))
