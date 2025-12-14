// Import Mongoose for schema creation
const mongoose = require('mongoose');

// Define the File schema for storing file metadata in MongoDB
const fileSchema = new mongoose.Schema({
    filename: String,         // Stored filename with UUID prefix
    originalName: String,     // Original filename uploaded by user
    uuid: String,            // Unique identifier for the file
    path: String,            // File path on server (uploads directory)
    size: Number,            // File size in bytes
    password: String,        // Hashed password for protected files (optional)
    expiresAt: Date,         // Expiration date/time for the download link (optional)
    downloads: {
        type: Number,
        default: 0           // Track number of times file has been downloaded
    },
    createdAt: {
        type: Date,
        default: Date.now    // Timestamp when file was uploaded
    }
});

// Export the File model for use in controllers
module.exports = mongoose.model('File', fileSchema);