const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./server/routes/auth');

// Initialize Express App
const app = express();

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose
    .connect('mongodb://localhost:27017/learnly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes); // Register the auth routes

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
