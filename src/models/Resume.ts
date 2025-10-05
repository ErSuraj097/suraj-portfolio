import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  location: String,
  description: {
    type: String,
    required: true,
  },
  achievements: [{
    type: String,
  }],
  technologies: [{
    type: String,
  }],
});

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  field: String,
  duration: {
    type: String,
    required: true,
  },
  gpa: String,
  description: String,
});

const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  credentialId: String,
  url: String,
});

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    fullName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
  },
  summary: {
    type: String,
    required: true,
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  certifications: [CertificationSchema],
  skills: {
    technical: [{
      category: String,
      items: [String],
    }],
    soft: [String],
  },
  languages: [{
    name: String,
    proficiency: String,
  }],
  resumeFile: String, // URL to PDF resume
}, {
  timestamps: true,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);