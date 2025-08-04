// models/WatchLog.js
import mongoose from 'mongoose';

const watchLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  finishedAt: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.model('WatchLog', watchLogSchema);
