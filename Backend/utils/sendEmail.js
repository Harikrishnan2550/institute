// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,          // smtp.office365.com
//   port: Number(process.env.SMTP_PORT),  // 587
//   secure: false,                        // MUST be false for 587 (TLS STARTTLS)
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     ciphers: "TLSv1.2"
//   }
// });

// const sendEmail = async ({ to, subject, text, html }) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//     html: html || text,
//   });
// };

// export default sendEmail;



import nodemailer from "nodemailer";

// Detect secure mode automatically
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const isSecure = smtpPort === 465; // ✅ only 465 uses secure:true

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: smtpPort,
  secure: isSecure, // ✅ true for 465, false for 587/2525

  auth: {
    user: process.env.EMAIL_USER, // ✅ Brevo SMTP login
    pass: process.env.EMAIL_PASS, // ✅ Brevo SMTP key (xkeysib-...)
  },

  // ✅ Helps in some VPS providers / restrictive networks
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Verify SMTP on server start (very useful for debugging)
transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP verify failed:", err.message);
    console.error(
      "➡️ Check SMTP_HOST / SMTP_PORT / EMAIL_USER / EMAIL_PASS in .env"
    );
  } else {
    console.log(
      `✅ SMTP ready (${process.env.SMTP_HOST}:${smtpPort}, secure=${isSecure})`
    );
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });

    console.log("✅ Email sent:", info.messageId, "to:", to);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;
