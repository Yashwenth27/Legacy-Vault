// src/utils/emailSender.ts
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with the Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    console.log(`🚀 Sending email to ${to} via Resend...`);

    // NOTE: Without a custom domain, Resend only allows sending 
    // FROM 'onboarding@resend.dev' 
    // TO the email address you signed up with (for testing).
    const data = await resend.emails.send({
      from: 'LegacyVault <onboarding@resend.dev>', 
      to: to, 
      subject: subject,
      html: htmlContent,
    });

    if (data.error) {
      console.error("❌ Resend API Error:", data.error);
      return false;
    }

    console.log(`✅ Email sent successfully! ID: ${data.data?.id}`);
    return true;
  } catch (error) {
    console.error("❌ Fatal Email Error:", error);
    return false;
  }
};