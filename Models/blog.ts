import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const blogSch = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    publish: {
        type: Boolean,
        required: true
    },
    author: {
        type: { type: Schema.Types.ObjectId, ref: 'Users' }
    }
});

const travelersSch = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Object,
        default: Date.now
    }
});

export const travelers = mongoose.model("travelers", travelersSch)

export const blogs = mongoose.model("blogs", blogSch)