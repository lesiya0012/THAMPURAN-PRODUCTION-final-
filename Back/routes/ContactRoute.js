const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure transporter (use Gmail + App Passwords)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS  // your Gmail app password
  }
});

// POST new contact message
router.post('/', async (req, res) => {
  try {
    // Save to DB
    const contact = new Contact(req.body);
    const saved = await contact.save();

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // your inbox
      subject: `New Contact Message from ${req.body.name}`,
      text: `
        Name: ${req.body.name}
        Email: ${req.body.email}
        Message: ${req.body.message}
      `,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Message:</strong> ${req.body.message}</p>
      `
    });

    res.status(201).json({ message: "Message saved and email sent!", saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;