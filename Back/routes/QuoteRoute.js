const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const nodemailer = require("nodemailer");
require("dotenv").config();

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST QUOTE
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      budget,
      timeline,
      message
    } = req.body;

    // ✅ SAVE TO DB
    const newQuote = new Quote({
      name,
      email,
      phone,
      projectType,
      budget,
      timeline,
      message
    });

    const savedQuote = await newQuote.save();

    // ✅ SEND EMAIL TO YOU
    await transporter.sendMail({
      from: `"Quote Request" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🎬 New Quote - ${projectType}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#eab308;">New Quote Request</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>

          <hr/>

          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
          <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>

          <hr/>

          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    });

    // ✅ AUTO REPLY TO CLIENT
    await transporter.sendMail({
      from: `"Thampuran Productions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your quote request 🎬",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Thampuran Productions.</p>
        <p>We’ll review your request and get back to you shortly.</p>
        <br/>
        <p>— Thampuran Productions</p>
      `
    });

    res.status(201).json({
      message: "Quote submitted successfully",
      data: savedQuote
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
});

module.exports = router;