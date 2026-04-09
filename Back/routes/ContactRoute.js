const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// ✅ SendGrid config
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST new contact message
router.post('/', async (req, res) => {
  try {
    // Save to DB
    const contact = new Contact(req.body);
    const saved = await contact.save();

    // Send email to YOU
    await sgMail.send({
      to: process.env.EMAIL_USER, // your email
      from: process.env.EMAIL_USER, // must be verified in SendGrid
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

    // AUTO REPLY TO CLIENT
    await sgMail.send({
      to: req.body.email,
      from: process.env.EMAIL_USER, // verified SendGrid email
      subject: "We received your message",
      html: `
        <p>Hi ${req.body.name},</p>
        <p>Thank you for reaching out to Thampuran Productions.</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p>— Thampuran Productions</p>
      `
    });

    res.status(201).json({ message: "Message saved and email sent!", saved });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;