
import mongoose from "mongoose"
// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 12,
    },
    username: {
        type: String,
        min: 6,
        max: 32,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        min: 6,
        max: 32,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,

    }
})

// Create the User model from the schema
export default mongoose.model('User', userSchema);

