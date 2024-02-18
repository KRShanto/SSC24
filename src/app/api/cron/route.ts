import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SUBJECTS, COLLECTIONS, SITE_NAME } from "@/lib/const";
import { getSubjects } from "@/lib/getSubjects";
import moment from "moment";
import { sendEmail } from "@/lib/sendEmail";
import { getSettings } from "@/lib/getSettings";
import { headers } from "next/headers";
import { getUpcomingSubjects } from "@/lib/getUpcomingSubjects";

// Send email to all users to let them know about their progress and upcoming exams
export async function GET() {
  const headersList = headers();
  const authorization = headersList.get("authorization");
  const secret = process.env.CRON_SECRET;

  // Check if the request is coming from the cron job
  if (authorization !== `Bearer ${secret}`) {
    return new Response("Not authorized", { status: 401 });
  }

  // Get all users
  const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
  const users = snapshot.docs.map((doc) => doc.data());

  // For each user
  for (const user of users) {
    // Get settings for this user
    const settings = await getSettings(user.email);

    // If email notification is disabled, skip this user
    if (!settings.emailNotification) continue;

    // // Get all subjects for this user
    // const subjects = await getSubjects(user.email, false);

    // // If there's no subject, skip this user
    // if (!subjects) continue;

    // // Add the date of each subject to the subject object
    // const subjectsWithDate = subjects.map((subject) => {
    //   const subjectWithDate = SUBJECTS.find(
    //     (subjectWithDate) => subjectWithDate.name === subject.name,
    //   );
    //   return { ...subjectWithDate, ...subject };
    // });

    // // Get today's date
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);

    // // Find all upcoming subjects
    // const upcomingSubjects = subjectsWithDate.filter((subject) => {
    //   if (subject && subject.date) {
    //     return subject.date.getTime() >= today.getTime();
    //   }
    //   return false;
    // });

    // Get the upcoming subjects for this user
    const upcomingSubjects = await getUpcomingSubjects({
      userEmail: user.email,
      shouldRedirect: false,
      startingHour0: true,
    });

    // if there's no upcoming subject, skip this user
    if (!upcomingSubjects) continue;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find if there's any subject today
    const subjectToday = upcomingSubjects.find((subject) => {
      if (subject && subject.date) {
        const subjectDate = new Date(subject.date);
        subjectDate.setHours(0, 0, 0, 0);
        return subjectDate.getTime() === today.getTime();
      }
      return false;
    });

    // Data for the email
    let text = "";
    let html = "";
    let subject = "";

    // If there's an exam today, greet the user and wish them good luck
    if (subjectToday) {
      subject = `Good luck for your ${subjectToday.name} exam!`;
      // If there's a subject today, greet the user and wish them good luck
      text = `Hello ${user.name},
        You have an exam on ${subjectToday.name} today. Good luck!
        
        Remember, the journey of a thousand miles begins with a single step. So, let's start this journey together and make every day count.
        
        Best of luck for your exam!
        
        Warm Regards,
        The ${SITE_NAME} Team`;
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Hello ${user.name},</h2>

            <p style="font-size: 18px; line-height: 1.6;">You have an exam on <strong>${subjectToday.name}</strong> today. Good luck!</p>

            <p style="font-size: 18px; line-height: 1.6;">Remember, the journey of a thousand miles begins with a single step. So, let's start this journey together and make every day count.</p>

            <p style="font-size: 18px; line-height: 1.6;">Best of luck for your exam!</p>

            <p style="font-size: 18px; line-height: 1.6;">Warm Regards,<br>The <strong>${SITE_NAME}</strong> Team</p>
        </div>`;
    } else {
      // If there's no subject today, find the next subject
      const nextSubject = upcomingSubjects.sort((a, b) => {
        if (a?.date && b?.date) {
          return a.date.getTime() - b.date.getTime();
        } else {
          return 0;
        }
      })[0];

      // Find the difference between today and the next subject
      const diffDays = moment(nextSubject.date).diff(moment(), "days");
      // If the next subject is 0, return tomorrow
      const days = diffDays === 0 ? "tomorrow" : `${diffDays} days`;

      // If there's a next subject, tell the user how many days are left for the next exam and their progress
      if (nextSubject && nextSubject.date) {
        subject = `Your next exam is on ${nextSubject.name} in ${days}`;
        text = `Hello ${user.name}, your next exam is on ${nextSubject.name} in ${diffDays} days. Keep up the good work!`;
        html = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border-radius: 10px;">
              <h2 style="color: #4CAF50; text-align: center;">Hello ${user.name},</h2>

              <p style="font-size: 18px; line-height: 1.6;">Here are your upcoming exams:</p>

              <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                  <thead>
                      <tr style="background-color: #4CAF50; color: #fff;">
                          <th style="padding: 10px; border: 1px solid #fff;">Subject</th>
                          <th style="padding: 10px; border: 1px solid #fff;">Date</th>
                          <th style="padding: 10px; border: 1px solid #fff;">After</th>
                          <th style="padding: 10px; border: 1px solid #fff;">Progress</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${upcomingSubjects
                        .map(
                          (subject) => `
                          <tr>
                              <td style="padding: 10px; border: 1px solid #ccc;">${subject.name}</td>
                              <td style="padding: 10px; border: 1px solid #ccc;">${moment(
                                subject.date,
                              ).format("DD MMM")}</td></td>
                              <td style="padding: 10px; border: 1px solid #ccc;">
                              ${moment(subject.date).diff(moment(), "days")} days left
                              </td>
                              <td style="padding: 10px; border: 1px solid #ccc;">${subject.completed}%</td>
                          </tr>
                      `,
                        )
                        .join("")}
                  </tbody>
              </table>

              <p style="font-size: 18px; line-height: 1.6; margin-top: 20px;">Best of luck for your exams!</p>

              <p style="font-size: 18px; line-height: 1.6;">Warm Regards,<br>The <strong>${SITE_NAME}</strong> Team</p>
          </div>`;
      } else {
        // If there's no next subject, congratulate the user for completing all their exams
        text = `Hello ${user.name},
          Congratulations on completing all your exams! This is a huge accomplishment and you should be very proud of yourself.
          
          Now it's time to relax and wait for the results. We wish you all the best for your result day. Remember, no matter what the outcome, you've worked hard and should be proud of your efforts.
          
          Warm Regards,
          The ${SITE_NAME} Team`;
        html = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border-radius: 10px;">
              <h2 style="color: #4CAF50; text-align: center;">Hello ${user.name},</h2>

              <p style="font-size: 18px; line-height: 1.6;">Congratulations on completing all your exams! This is a huge accomplishment and you should be very proud of yourself.</p>

              <p style="font-size: 18px; line-height: 1.6;">Now it's time to relax and wait for the results. We wish you all the best for your result day. Remember, no matter what the outcome, you've worked hard and should be proud of your efforts.</p>

              <p style="font-size: 18px; line-height: 1.6;">Warm Regards,<br>The <strong>${SITE_NAME}</strong> Team</p>
          </div>`;
      }
    }

    // Send email
    await sendEmail({
      to: user.email,
      subject,
      text,
      html,
    });
  }

  return new Response("Emails sent", { status: 200 });
}
