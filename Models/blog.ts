import mongoose from 'mongoose';

const blogSch = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    bodytext: {
        type: String,
        required: true
    }
});

export const blogs = mongoose.model("blogs", blogSch)
