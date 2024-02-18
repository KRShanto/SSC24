"use server";

import { SITE_NAME } from "@/lib/const";
import { sendEmail } from "@/lib/sendEmail";

/**
 * Sends a welcome email to a new user.
 *
 * @param params - The parameters for sending the email.
 * @returns A Promise that resolves when the email has been sent.
 */
export async function sendWelcomeEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const mailOptions = {
    to: email,
    subject: `Welcome Aboard, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border-radius: 10px; border: 1px solid silver;">
          <h2 style="color: #4CAF50; text-align: center; font-size: 22px">Welcome Aboard, ${name}!</h2>       

          <p style="font-size: 18px; line-height: 1.6;">We're thrilled to have you at <strong>${SITE_NAME}</strong>!</p>

          <p style="font-size: 18px; line-height: 1.6;">Our mission is to empower students like you to excel in the SSC exam in 2024. With our daily progress tracking, you'll always know where you stand and how far you've come. Plus, you can plan your study schedule with our exam routing feature.</p>

          <p style="font-size: 18px; line-height: 1.6;">Remember, the journey of a thousand miles begins with a single step. So, let's start this journey together and make every day count.</p>

          <p style="font-size: 18px; line-height: 1.6;">Best of luck for your exam!</p>

          <p style="font-size: 18px; line-height: 1.6;">Warm Regards,<br>The <strong>${SITE_NAME}</strong> Team</p>       
      </div>`,
    text: `
      Welcome Aboard, ${name}!

      We're thrilled to have you at ${SITE_NAME}!

      Our mission is to empower students like you to excel in the SSC exam in 2024. With our daily progress tracking, you'll always know where you stand and how far you've come. Plus, you can plan your study schedule with our exam routing feature.

      Remember, the journey of a thousand miles begins with a single step. So, let's start this journey together and make every day count.

      Best of luck for your exam!

      Warm Regards,
      The ${SITE_NAME} Team`,
  };

  await sendEmail(mailOptions);
}
