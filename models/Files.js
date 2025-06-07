import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: String,
  fileName: String,
  mimeType: String,
  size: Number,
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books',
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Files', fileSchema);