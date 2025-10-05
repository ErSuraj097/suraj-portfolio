import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: String,
  tags: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['AI/ML', 'Backend', 'Full Stack', 'Technology', 'Career'],
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  readTime: {
    type: Number,
    default: 5,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);