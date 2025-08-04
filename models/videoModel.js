import mongoose from "mongoose";

// creating a video schema
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoFilePath: {
        type: String,
        required: true
    },
}, { timestamps: true })

// creating and exporting Video model 
export const Video = mongoose.model("Video", videoSchema);