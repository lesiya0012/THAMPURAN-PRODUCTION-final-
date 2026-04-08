const multer = require("multer");

// Use memory storage for Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;