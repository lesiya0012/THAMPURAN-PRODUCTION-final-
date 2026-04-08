const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["photo", "video","graphic"],
      default: "video",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    groupId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Media", mediaSchema);