const nodemailer = require('nodemailer');

const sendEmailNotification = async (messageData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0056b3;">New Contact Submission</h2>
        <p><strong>From:</strong> ${messageData.name} (${messageData.email})</p>
        <p><strong>Subject:</strong> ${messageData.subject}</p>
        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #0056b3; background-color: #f9f9f9;">
          <p style="margin: 0; white-space: pre-wrap;">${messageData.message}</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Message: ${messageData.subject}`,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};

module.exports = {
  sendEmailNotification,
};
