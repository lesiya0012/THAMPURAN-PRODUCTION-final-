const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    default: ""
  },

  projectType: {
    type: String,
    required: true
  },

  budget: {
    type: String,
    default: ""
  },

  timeline: {
    type: String,
    default: ""
  },

  message: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quote", quoteSchema);