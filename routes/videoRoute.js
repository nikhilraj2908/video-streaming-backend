import express from "express";
import { uploadNewVideo, getAllVideos, deleteThisVideo, readSubtitle } from "../controllers/videoControl.js";

// creating an express router
const router = express.Router();

// setting up router path
router.post("/uploadvideo", uploadNewVideo);
router.get("/getvideos", getAllVideos)
router.delete("/deletevideo/:vid", deleteThisVideo)
router.get("/getsubtitles/:vid", readSubtitle)

// exporting router
export default router;