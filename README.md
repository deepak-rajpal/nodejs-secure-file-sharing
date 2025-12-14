# 🔐 Node.js Secure File Sharing

A **basic secure file sharing project** built with Node.js and MongoDB. It allows users to upload files, generate unique download links, and optionally protect them with passwords and expiration times.

---

## 📌 Project Overview

This is a **simple, beginner-friendly project** designed to demonstrate core backend concepts using Node.js and MongoDB.

Users can upload files through a web interface and receive a unique download link. The system supports password protection and time-based expiration for added security. Files are stored on the server with unique identifiers, while metadata such as download counts, expiration dates, and optional password hashes are tracked in MongoDB.

---

## ✨ Key Features

- 📤 Upload files with UUID-based identifiers  
- 🔒 Optional password protection using bcrypt  
- ⏳ Configurable expiration times for download links  
- 📊 Download count tracking  
- 🔌 RESTful API design  
- 🎨 Clean and responsive web interface  

---

### 🎯 Ideal For
- Beginners learning **Node.js backend development**
- Understanding **file uploads**, **authentication**, and **MongoDB integration**
- Building a **portfolio-ready project**

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Express** | Fast, minimalist web framework for Node.js; handles routing and middleware |
| **Mongoose** | MongoDB object modeling tool; provides schema-based data modeling and validation |
| **Multer** | Middleware for handling multipart/form-data; manages file uploads and storage |
| **UUID** | Generates unique identifiers for uploaded files to create secure download links |
| **bcryptjs** | Password hashing library; encrypts passwords for secure file protection |
| **dotenv** | Loads environment variables from .env file for secure configuration management |

---

## Prerequisites

Before running this project, ensure you have:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/deepak-rajpal/nodejs-secure-file-sharing.git
cd nodejs-secure-file-sharing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables to the `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/file-sharing-app
```

**For MongoDB Atlas:**
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/file-sharing-app?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### 4. Start the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

For development with auto-restart:
```bash
npm run dev
```

## Project Structure

```
.
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   └── fileController.js     # File upload and download logic
├── models/
│   └── File.js              # Mongoose schema for file metadata
├── public/
│   ├── index.html           # File upload interface
│   └── download.html        # File download interface
├── routes/
│   └── files.js             # API routes for file operations
├── uploads/                 # Directory for uploaded files
├── .env                     # Environment variables (create this)
├── package.json             # Project dependencies
└── server.js               # Application entry point
```

## API Endpoints

### Upload File
```
POST /api/files/upload
```
**Body (multipart/form-data):**
- `file`: File to upload
- `password` (optional): Password to protect the file
- `expiresIn` (optional): Expiration time in seconds

**Response:**
```json
{
  "downloadPage": "/download.html?uuid=abc123"
}
```

### Download File
```
GET /api/files/download/:uuid?password=yourpassword
```
**Parameters:**
- `uuid`: Unique file identifier
- `password` (query parameter, optional): Required if file is password-protected

## Usage

1. Open `http://localhost:3000` in your browser
2. Select a file to upload
3. Optionally set a password and/or expiration time
4. Click upload and receive a unique download link
5. Share the link with others
6. Recipients can download the file using the link (and password if protected)

## Security Features

- **Password Encryption**: Passwords are hashed using bcryptjs before storage
- **Unique Identifiers**: UUIDs prevent guessing of download links
- **Expiration Control**: Links automatically expire after specified time
- **Download Tracking**: Monitor how many times files are accessed

---

## 📸 Screenshots

### File Upload Interface
![Upload File](screenshots/upload-file.png)

### File Download Interface
![Download File](screenshots/download-file.png)

---

## Contributing

This is a learning project. Contributions are not required, but corrections, bug fixes, and feedback are appreciated.

## License

This project is licensed under the MIT License.

---

**Note**: Remember to add `uploads/` and `.env` to your `.gitignore` file to prevent sensitive data from being committed to version control.
