// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');

// Async function to establish connection with MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        // Log error and exit the process if connection fails
        console.error(err);
        process.exit(1);
    }
};

// Export the connectDB function for use in server.js
module.exports = connectDB;