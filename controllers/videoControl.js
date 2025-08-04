import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { multerUpload } from "../middlewares/multerMiddleware.js"
import { Video } from "../models/videoModel.js";
import { createVTTFile } from "../utils/createVttFile.js";
import { deleteVTTFile } from '../utils/deleteVttFile.js';
import { deleteUploadVideo } from '../utils/deleteUploadVideo.js';

// function to control the video upload
export const uploadNewVideo = async (req, res) => {
  try {
    // using multerUpload function from multerMidddleware
    multerUpload(req, res, async (err) => {

      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading files');
      }

      // setting video details
      const { title, description } = req.body;
      const videoFilePath = req.file.originalname;

      // creating new video object with above details using video model
      const newVideo = new Video({
        title,
        description,
        videoFilePath,
      })

      // saving newWideo to database
      await newVideo.save();

      // destructuring id as videoId of newVideo and getting parsed subtitles 
      const { _id: videoId } = newVideo;
      const subtitles = JSON.parse(req.body.subtitles || '[]');

      try {
        await createVTTFile(subtitles, videoId);
        res.status(201).json({ message: "Video uploaded with subtitle file creation." })
      } catch (error) {
        console.error(error)
      }

    })
  } catch (error) {
    console.log(error);
  }
}

// function to fetch all videos
export const getAllVideos = async (req, res) => {
  try {
    // fetching all videos from videos document
    const allVideos = await Video.find();
    res.status(200).json(allVideos)
  } catch (error) {
    console.log(error)
  }
}

// function to delete a selected video
export const deleteThisVideo = async (req, res) => {
  try {
    const videoId = req.params.vid;

    // deleting vtt file first
    await deleteVTTFile(videoId)

    // getting videoFilePath of video being deleted 
    const thisVideo = await Video.findById(videoId).select("-title -description -subFilePath -createdAt -updatedAt")
    const { videoFilePath: thisVideoPath } = thisVideo;

    // deleting targetted uploaded video
    await deleteUploadVideo(thisVideoPath);

    // deleting video document of targetted video id
    const deleted = await Video.deleteOne({ _id: videoId });

    // returning response
    res.status(201).json({ message: "Deleted", deleted })
  } catch (error) {
    console.log(error);
  }
}

// function to control subtitle reading
export const readSubtitle = (req, res) => {
  const videoId = req.params.vid;

  // using fileURLToPath to convert the URL to a file path
  const currentModulePath = fileURLToPath(import.meta.url);

  // using path.join to navigate to the 'subtitles' directory
  const subtitlePath = path.join(path.dirname(currentModulePath), '../subtitles', `${videoId}.vtt`);

  // checking if the file exists
  if (fs.existsSync(subtitlePath)) {
    res.sendFile(subtitlePath);
  } else {
    res.status(404).send('Subtitle not found');
  }
}