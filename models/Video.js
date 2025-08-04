import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    tags: [String],
    visibility: {
      type: String,
      enum: ['public', 'unlisted', 'private'],
      default: 'public',
    },
    filePath: { type: String, required: true },
    thumbnailPath: { type: String }, // optional
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    feedback: {
      pre: String,
      post: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
