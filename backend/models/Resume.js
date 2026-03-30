const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  industry: { 
    type: String, 
    enum: ['technology', 'finance', 'healthcare', 'marketing', 'education'],
    required: true 
  },
  template: { type: String, default: 'modern' },
  
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String
  },
  
  summary: String,
  
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: [String],
    achievements: [String]
  }],
  
  education: [{
    institution: String,
    degree: String,
    field: String,
    graduationDate: Date,
    gpa: String
  }],
  
  skills: {
    technical: [String],
    soft: [String],
    tools: [String]
  },
  
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
    highlights: [String]
  }],
  
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    credentialId: String
  }],
  
  atsScore: { type: Number, default: 0 },
  aiSuggestions: [String],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);