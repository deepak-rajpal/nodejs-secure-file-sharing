// Import required dependencies
const express = require('express');
const router = express.Router();
const { uploadFile, downloadFile } = require('../controllers/fileController');
const multer = require('multer');      // Middleware for handling file uploads
const { v4: uuidv4 } = require('uuid'); // Generate unique identifiers
const path = require('path');

// Configure multer storage settings
const storage = multer.diskStorage({
    destination: 'uploads/',  // Directory where files will be saved
    filename: (req, file, cb) => {
        // Generate unique filename with UUID prefix + original filename
        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// POST route: Upload a file (single file with field name 'file')
router.post('/upload', upload.single('file'), uploadFile);

// GET route: Download a file by UUID
router.get('/download/:uuid', downloadFile);

// Export router for use in server.js
module.exports = router;