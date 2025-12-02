// src/utils/emailSender.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configure the "Transporter" (The Postman)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // --- ADD THIS BLOCK ---
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
  },
  // Force IPv4
  family: 4, 
  // ----------------------
});

// 2. The Send Function
export const sendEmail = async (to: string, subject: string, htmlContent: string) => { // Changed 'text' to 'htmlContent'
  try {
    const info = await transporter.sendMail({
      from: `"LegacyVault Security" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent, // <--- Use 'html' property
    });

    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}`, error);
    return false;
  }
};
