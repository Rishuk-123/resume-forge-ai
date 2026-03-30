const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getUser } = require('../controllers/authController');

// @route   POST api/auth/register
router.post('/register', register);

// @route   POST api/auth/login
router.post('/login', login);

// @route   GET api/auth/user
router.get('/user', auth, getUser);

module.exports = router;