// Utils/sendEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.office365.com
  port: process.env.SMTP_PORT, // 587
  secure: false, // must be false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // prevents certificate issues
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"BSoft Education" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: html || text,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
