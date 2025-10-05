import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Project', 'Achievement', 'Team', 'Event'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
