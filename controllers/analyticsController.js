import WatchLog from '../models/WatchLog.js';
import Video from '../models/Video.js';

// Start or finish watching a video
export const logWatch = async (req, res) => {
  const { videoId, action } = req.body;
  const userId = req.user._id;

  try {
    if (action === 'start') {
      const log = await WatchLog.create({ user: userId, video: videoId });
      return res.status(201).json({ msg: 'Watch started', logId: log._id });
    }

    if (action === 'finish') {
      const log = await WatchLog.findOne({ user: userId, video: videoId }).sort({ createdAt: -1 });
      if (log) {
        log.finishedAt = new Date();
        await log.save();
        return res.status(200).json({ msg: 'Watch finished' });
      }
    }

    res.status(400).json({ msg: 'Invalid action or log not found' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to track watch', error: err.message });
  }
};

// Get current viewers
export const getCurrentViewers = async (req, res) => {
  const { videoId } = req.params;
  const nowWatching = await WatchLog.find({ video: videoId, finishedAt: null }).populate('user', 'name email');
  res.status(200).json(nowWatching);
};
