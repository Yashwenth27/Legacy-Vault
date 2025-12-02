// src/utils/emailTemplates.ts

const STYLE = `
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .header { background-color: #0f172a; padding: 24px; text-align: center; }
  .logo { color: #2dd4bf; font-size: 24px; font-weight: bold; text-decoration: none; letter-spacing: -0.5px; }
  .content { padding: 40px 32px; color: #334155; line-height: 1.6; }
  .btn { display: inline-block; background-color: #0d9488; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
  .footer { background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; }
  .alert-box { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; color: #991b1b; }
`;

export const getHtmlTemplate = (title: string, body: string, btnLink?: string, btnText?: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${STYLE}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="#" class="logo">🛡️ LegacyVault</a>
          </div>
          <div class="content">
            <h2 style="color: #0f172a; margin-top: 0;">${title}</h2>
            ${body}
            ${btnLink ? `<br/><center><a href="${btnLink}" class="btn">${btnText}</a></center>` : ''}
          </div>
          <div class="footer">
            <p>Secure. Automated. Eternal.</p>
            <p>© ${new Date().getFullYear()} LegacyVault Inc. | Zero-Knowledge Architecture</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// 1. WELCOME EMAIL
export const welcomeEmail = (name: string) => getHtmlTemplate(
  "Welcome to the Fortress.",
  `<p>Hello,</p>
   <p>You have successfully secured your digital legacy. Your vault is now active and encrypted with Zero-Knowledge architecture.</p>
   <p><b>Next Steps:</b><br/>1. Add your first secret.<br/>2. Add a Nominee (Beneficiary).<br/>3. Relax.</p>`,
  "http://localhost:3000/dashboard",
  "Go to My Vault"
);

// 2. NOMINEE ADDED NOTIFICATION
export const nomineeInviteEmail = (ownerEmail: string, nomineeName: string) => getHtmlTemplate(
  "You have been trusted.",
  `<p>Hello ${nomineeName},</p>
   <p><b>${ownerEmail}</b> has designated you as a beneficiary in their LegacyVault.</p>
   <p>In the unfortunate event that they stop responding to our security checks, you will receive a secure key to access their digital assets.</p>
   <p>You do not need to do anything right now.</p>`
);

// 3. HEARTBEAT WARNING
export const heartbeatWarningEmail = (daysLeft: number, resetLink: string) => getHtmlTemplate(
  "⚠️ Security Check: Are you active?",
  `<div class="alert-box">
     <strong>Action Required:</strong> We have not detected activity from you recently.
   </div>
   <p>If you do not respond within <b>${daysLeft} days</b>, your security protocol will trigger, and your data will be released to your nominees.</p>`,
  resetLink,
  "I Am Alive (Reset Timer)"
);