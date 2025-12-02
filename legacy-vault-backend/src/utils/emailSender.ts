// src/utils/emailSender.ts
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport'; // <--- NEW IMPORT
import dotenv from 'dotenv';

dotenv.config();

// Define options with the correct Type
const transportOptions: SMTPTransport.Options = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  // Force IPv4 to prevent timeouts on Render
  family: 4, 
  // Timeouts to fail fast instead of hanging
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
};

const transporter = nodemailer.createTransport(transportOptions);

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    console.log(`Attempting to send email to ${to}...`);
    
    const info = await transporter.sendMail({
      from: `"LegacyVault Security" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log(`✅ Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}`, error);
    return false;
  }
};
