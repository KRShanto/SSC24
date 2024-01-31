import { COLLECTIONS, DBSubject } from "@/lib/const";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// get the subjects from the database
export async function getSubjects(
  userEmail: string,
  shouldRedirect: boolean = true,
) {
  const docRef = doc(db, COLLECTIONS.SUBJECTS, userEmail);
  const docSnap = await getDoc(docRef);
  const dbSubject = docSnap.data() as DBSubject;

  if (!dbSubject && shouldRedirect) {
    redirect("/create");
  }

  return dbSubject ? dbSubject.subjects : null;
}
