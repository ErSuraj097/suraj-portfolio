import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  technologies: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['AI/ML', 'Backend', 'Full Stack', 'Mobile'],
    required: true,
  },
  images: [{
    type: String,
  }],
  githubUrl: String,
  liveUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);