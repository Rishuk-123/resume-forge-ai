const Resume = require('../models/Resume');
const User = require('../models/User');

// Create Resume
// Add this to resumeController.js

const { calculateATSScore, generateATSSuggestions } = require('../utils/atsScorer');

// Modify createResume and updateResume to include ATS scoring
exports.createResume = async (req, res) => {
  try {
    const atsScore = calculateATSScore(req.body);
    const aiSuggestions = generateATSSuggestions(req.body, atsScore);
    
    const resume = new Resume({
      user: req.user.id,
      ...req.body,
      atsScore,
      aiSuggestions
    });
    
    await resume.save();
    
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { resumes: resume._id } }
    );
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All User Resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Single Resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    // Check ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Resume
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await resume.remove();
    
    // Remove from user's resumes array
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { resumes: req.params.id } }
    );
    
    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};