// routes/analyticsRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import { logWatch, getCurrentViewers } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/log', protect, logWatch); // user logs watch start/finish
router.get('/now-watching/:videoId', protect, isAdmin, getCurrentViewers); // admin sees current viewers

export default router;
