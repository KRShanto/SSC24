import "server-only";

const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_EMAIL_PASSWORD = process.env.SMTP_EMAIL_PASSWORD;

import nodemailer from "nodemailer";

// Send email using Gmail SMTP
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent to: " + to + " - " + info.response);
  } catch (error) {
    console.error("Error sending email to: " + to + " - " + error);
  }
}
