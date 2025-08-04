// controllers/videoController.js
import Video from '../models/Video.js';
import Comment from '../models/Comment.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Upload video (admin only)
// export const uploadVideo = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const file = req.file;

//     if (!file) return res.status(400).json({ msg: 'No video file uploaded' });

//     const newVideo = await Video.create({
//       title,
//       description,
//       filePath: file.filename,
//       uploadedBy: req.user._id
//     });

//     res.status(201).json({ msg: 'Video uploaded successfully', video: newVideo });
//   } catch (err) {
//     res.status(500).json({ msg: 'Upload failed', err });
//   }
// };
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, tags, visibility } = req.body;
    const files = req.files;

    if (!files || !files.video) {
      return res.status(400).json({ msg: 'Video file is required' });
    }

    const videoFile = files.video[0];
    const thumbnailFile = files.thumbnail?.[0];

    const newVideo = await Video.create({
      title,
      description,
      category,
      tags: tags?.split(',').map(tag => tag.trim()),
      visibility,
      filePath: videoFile.filename,
      thumbnailPath: thumbnailFile?.filename,
      uploadedBy: req.user._id,
    });

    res.status(201).json({ msg: 'Video uploaded successfully', video: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
};


// Get all videos
export const getAllVideos = async (req, res) => {
  const videos = await Video.find().populate('uploadedBy', 'name email');
  res.status(200).json(videos);
};

// Like or Unlike a video
export const toggleLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ msg: 'Video not found' });

  const alreadyLiked = video.likes.includes(userId);
  if (alreadyLiked) {
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
  }

  await video.save();
  res.status(200).json({ likes: video.likes.length });
};

// Comment on video
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ msg: 'Video not found' });

  const comment = await Comment.create({
    video: id,
    user: req.user._id,
    text
  });

  video.comments.push(comment._id);
  await video.save();

  res.status(201).json(comment);
};

// Get comments for video
export const getComments = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ video: id }).populate('user', 'name');
  res.status(200).json(comments);
};


// Add or update pre/post feedback (Admin only)
export const addFeedback = async (req, res) => {
  const { id } = req.params;
  const { pre, post } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ msg: 'Video not found' });

    video.feedback = { pre, post };
    await video.save();

    res.status(200).json({ msg: 'Feedback updated', feedback: video.feedback });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update feedback', error: err.message });
  }
};


// Stream video file to client
export const streamVideo = async (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, `../uploads/${filename}`);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ msg: 'Video not found on server' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
};