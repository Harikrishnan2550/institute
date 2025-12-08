import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp.office365.com
  port: Number(process.env.SMTP_PORT),  // 587
  secure: false,                        // MUST be false for 587 (TLS STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "TLSv1.2"
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html: html || text,
  });
};

export default sendEmail;
