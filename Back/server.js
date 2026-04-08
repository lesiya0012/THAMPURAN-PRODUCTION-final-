const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceRoutes = require("./routes/services");
const testimonialRoutes = require('./routes/testimonialRoute');
const ContactRoute = require('./routes/ContactRoute');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.send("Thampuran Production API running...");
});

app.use("/api/services", serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', ContactRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));