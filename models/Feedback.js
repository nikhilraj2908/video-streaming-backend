// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },

  pre: {
    type: String
  },

  post: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
