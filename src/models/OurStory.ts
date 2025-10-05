import mongoose from 'mongoose';

const OurStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    enum: ['Introduction', 'Journey', 'Mission', 'Future'],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.OurStory || mongoose.model('OurStory', OurStorySchema);
