// Import required dependencies
const express = require('express');
const fileRoutes = require('./routes/files');
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables from .env file

const path = require('path');

// Initialize Express application
const app = express();

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount file routes at /api/files endpoint
app.use('/api/files', fileRoutes);

// Start the server on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});