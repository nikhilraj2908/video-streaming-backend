// routes/videoRoutes.js
import express from 'express';
import {
  uploadVideo,
  getAllVideos,
  streamVideo,
  toggleLike,
  addComment,
  getComments,
  addFeedback
} from '../controllers/videoController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// router.post('/upload', protect, isAdmin, upload.single('video'), uploadVideo);

router.post(
  '/upload',
  protect, // or protect + isAdmin
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  uploadVideo
);

router.get('/all', protect, getAllVideos);
router.get('/stream/:filename', streamVideo);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.get('/:id/comments', protect, getComments);
router.put('/:id/feedback', protect, isAdmin, addFeedback);

export default router;
