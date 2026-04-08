// routes/PortfolioRoute.js
const express = require("express");
const router = express.Router();
const upload = require("../config/multer"); // Multer for file uploads
const cloudinary = require("../config/cloudinary"); // Cloudinary for storage
const Media = require("../models/Portfolio");

// ============================
// 🧠 Helper: Detect Media Type
// ============================
const getMediaType = (file, fallbackType) => {
  if (file) {
    return file.mimetype.startsWith("video") ? "video" : "photo";
  }
  return fallbackType || "video";
};

// ============================
// 🔹 Helper: Upload Buffer to Cloudinary
// ============================
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// ============================
// 📤 Upload Multiple Media
// ============================
router.post(
  "/upload-multiple",
  (req, res, next) => {
    req.setTimeout(5 * 60 * 1000); // 5 minutes timeout
    next();
  },
  upload.array("files"), // ✅ Multer handles multiple files
  async (req, res) => {
    try {
      const { categoryName, type, description, groupId, url } = req.body;

      if ((!req.files || req.files.length === 0) && !url) {
        return res.status(400).json({
          success: false,
          message: "No files or URL provided",
        });
      }

      let mediaItems = [];

      // ============================
      // 📸 Handle File Uploads
      // ============================
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await streamUpload(file.buffer);

          mediaItems.push({
            categoryName,
            type: getMediaType(file),
            url: result.secure_url,
            description,
            groupId,
          });
        }
      }

      // ============================
      // 🎥 Handle URL Upload
      // ============================
      if (url) {
        mediaItems.push({
          categoryName,
          type: getMediaType(null, type),
          url,
          description,
          groupId,
        });
      }

      // ============================
      // 💾 Save to MongoDB
      // ============================
      const saved = await Media.insertMany(mediaItems);

      res.status(201).json({
        success: true,
        count: saved.length,
        media: saved,
      });
    } catch (error) {
      console.error("SERVER ERROR 👉", error);
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  }
);

// ============================
// 📥 GET All Media
// ============================
router.get("/", async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media,
    });
  } catch (err) {
    console.error("GET ERROR 👉", err);
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
});

// ============================
// ✏️ UPDATE Media
// ============================
router.put(
  "/:id",
  (req, res, next) => {
    req.setTimeout(5 * 60 * 1000);
    next();
  },
  upload.array("files"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryName, type, description, groupId, url } = req.body;

      let updateData = {
        categoryName,
        type,
        description,
        groupId,
      };

      // 📸 If new file uploaded
      if (req.files && req.files.length > 0) {
        const file = req.files[0];
        const result = await streamUpload(file.buffer);

        updateData.url = result.secure_url;
        updateData.type = getMediaType(file);
      }

      // 🎥 If URL provided
      if (url) {
        updateData.url = url;
        updateData.type = getMediaType(null, type);
      }

      const updated = await Media.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Media not found",
        });
      }

      res.status(200).json({
        success: true,
        media: updated,
      });
    } catch (error) {
      console.error("UPDATE ERROR 👉", error);
      res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
  }
);

module.exports = router;