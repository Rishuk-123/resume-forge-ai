const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
  downloadPDF
} = require('../controllers/resumeController');

router.post('/', auth, createResume);
router.get('/', auth, getResumes);
router.get('/:id', auth, getResume);
router.put('/:id', auth, updateResume);
router.delete('/:id', auth, deleteResume);
router.get('/:id/pdf', auth, downloadPDF);

module.exports = router;