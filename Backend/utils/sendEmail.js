// Utils/sendEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "smtp.mailgun.org", etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"BSoft Education" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: html || text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
