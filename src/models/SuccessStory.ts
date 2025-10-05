import mongoose from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  metric: {
    type: String,
    required: true, // e.g., "50% increase in performance"
  },
  icon: String,
  category: {
    type: String,
    enum: ['Performance', 'Cost Reduction', 'User Growth', 'Efficiency'],
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

export default mongoose.models.SuccessStory || mongoose.model('SuccessStory', SuccessStorySchema);