import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: String,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Object,
        default: Date.now
    },
    updated_at: {
        type: String,
        default: Date.now
    },
});

export const register = mongoose.model("Users", registerSchema)
