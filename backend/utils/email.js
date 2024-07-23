// utils/email.js
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email', error);
  }
};

module.exports = sendEmail;
