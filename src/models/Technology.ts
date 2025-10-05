import mongoose from 'mongoose';

const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Programming Language', 'Framework', 'Database', 'Tool', 'Cloud Service'],
    required: true,
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  icon: String,
  description: String,
  yearsOfExperience: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Technology || mongoose.model('Technology', TechnologySchema);