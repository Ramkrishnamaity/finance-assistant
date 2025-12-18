const mongoose = require('mongoose');

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
  icon: {
    type: String,
    default: '💰'
  },
  color: {
    type: String,
    default: '#6366f1'
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
  timestamps: true
});

// Index for faster queries
categorySchema.index({ userId: 1, type: 1, freezed: 1 });

module.exports = mongoose.model('Category', categorySchema);
