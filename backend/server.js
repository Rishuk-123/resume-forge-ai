const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import database connection
const connectDB = require('./config/db');

// Import route files
const authRouter = require('./routes/auth');
const resumeRouter = require('./routes/resume');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// ================== MIDDLEWARES ==================

// Parse incoming JSON requests (req.body)
app.use(express.json());

// Enable Cross-Origin Resource Sharing (frontend can talk to backend)
app.use(cors());


// ================== ROUTES ==================

// Auth routes (login, register, get user)
// Base URL: /api/auth
app.use('/api/auth', authRouter);

// Resume related routes
// Base URL: /api/resume
app.use('/api/resume', resumeRouter);




// Use PORT from .env or default to 8080
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});