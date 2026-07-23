const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS settings
app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));

// Parse JSON requests
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('PulseVote API running!');
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({
        message: 'This is a test endpoint from PulseVote API!',
        status: 'success',
        timestamp: new Date()
    });
});

// Protected endpoint
app.get('/api/protected', protect, (req, res) => {
    res.json({
        message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
        timestamp: new Date()
    });
});

module.exports = app;