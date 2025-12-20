import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  notes: {
    type: String,
    trim: true
  },
  freezed: {
    type: Number,
    default: 0,
    enum: [0, 1]
  }
}, {
  timestamps: true
});

// Indexes for faster queries
incomeSchema.index({ userId: 1, date: -1, freezed: 1 });
incomeSchema.index({ userId: 1, categoryId: 1, freezed: 1 });

export default mongoose.model('Income', incomeSchema);
