import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Category type is required'],
    enum: {
      values: ['expense', 'income'],
      message: 'Type must be either expense or income'
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  freezed: {
    type: Number,
    default: 0,
    enum: [0, 1]
  }
}, {
  timestamps: false
});

// Index for faster queries
categorySchema.index({ userId: 1, type: 1, freezed: 1 });

export default mongoose.model('Category', categorySchema);
