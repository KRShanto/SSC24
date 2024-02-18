import { COLLECTIONS, DBSubject, SUBJECTS } from "@/lib/const";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// get the subjects from the database
export async function getUpcomingSubjects({
  userEmail,
  shouldRedirect = true,
  startingHour0 = false,
}: {
  userEmail: string;
  shouldRedirect?: boolean;
  startingHour0?: boolean;
}) {
  const docRef = doc(db, COLLECTIONS.SUBJECTS, userEmail);
  const docSnap = await getDoc(docRef);
  const dbSubject = docSnap.data() as DBSubject;

  if (!dbSubject && shouldRedirect) {
    redirect("/create");
  }

  if (!dbSubject) return null;

  const subjects = dbSubject.subjects;

  // Add the date of each subject to the subject object
  const subjectsWithDate = subjects!.map((subject) => {
    const subjectWithDate = SUBJECTS.find(
      (subjectWithDate) => subjectWithDate.name === subject.name,
    );
    return { ...subjectWithDate, ...subject };
  });

  // Get today's date
  const today = new Date();
  if (startingHour0) {
    today.setHours(0, 0, 0, 0);
  }

  // Find all upcoming subjects
  const upcomingSubjects = subjectsWithDate.filter((subject) => {
    if (subject && subject.date) {
      return subject.date.getTime() >= today.getTime();
    }
    return false;
  });

  return upcomingSubjects;
}
