const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true } // e.g. "FaFilm", "FaMusic"
});

module.exports = mongoose.model("Service", serviceSchema);