// Import required dependencies
const File = require('../models/File');
const bcrypt = require('bcryptjs');  // For password hashing
const fs = require('fs');

/**
 * Upload File Controller
 * Handles file upload, password protection, and expiration settings
 */
exports.uploadFile = async (req, res) => {
    // Extract optional password and expiration time from request body
    const { expiresIn, password } = req.body;
    
    // Prepare file metadata from multer upload
    const fileData = {
        filename: req.file.filename,              // Unique filename with UUID
        originalName: req.file.originalname,      // Original filename from user
        uuid: req.file.filename.split('-')[0],    // Extract UUID for download link
        path: req.file.path,                      // Server file path
        size: req.file.size                       // File size in bytes
    };

    // Hash password if provided (for password-protected downloads)
    if (password) {
        fileData.password = await bcrypt.hash(password, 10);
    }

    // Set expiration time if provided (convert seconds to milliseconds)
    if (expiresIn) {
        fileData.expiresAt = new Date(Date.now() + parseInt(expiresIn) * 1000);
    }

    // Save file metadata to MongoDB
    const file = await File.create(fileData);
    
    // Return download page URL with unique UUID
    return res.json({ downloadPage: `/download.html?uuid=${file.uuid}` });
};

/**
 * Download File Controller
 * Handles file download with password and expiration validation
 */
exports.downloadFile = async (req, res) => {
    // Find file by UUID from URL parameter
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.status(404).json({ error: 'File not found' });

    // Check if link has expired
    if (file.expiresAt && file.expiresAt < new Date()) {
        return res.status(410).json({ error: 'Link has expired' });
    }

    // Validate password for password-protected files
    if (file.password) {
        const { password } = req.query;
        // Request password if not provided
        if (!password) return res.status(403).json({ error: 'Password required' });

        // Compare provided password with hashed password
        const match = await bcrypt.compare(password, file.password);
        if (!match) return res.status(401).json({ error: 'Incorrect password' });
    }

    // Increment download counter
    file.downloads += 1;
    await file.save();

    // Send file for download with original filename
    res.download(file.path, file.originalName);
};