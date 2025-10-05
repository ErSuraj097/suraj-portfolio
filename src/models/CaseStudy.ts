import mongoose from 'mongoose';

const CaseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  client: String,
  duration: String,
  overview: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['AI/ML', 'Backend', 'Full Stack'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);