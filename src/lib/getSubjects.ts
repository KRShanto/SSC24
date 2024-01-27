import { DBSubject } from "@/lib/const";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function getSubjects(userEmail: string) {
  // get the subjects from the database
  const q = query(
    collection(db, "subjects"),
    where("userEmail", "==", userEmail),
  );
  const querySnapshot = await getDocs(q);
  const dbSubject = querySnapshot.docs.map((doc) => doc.data())[0] as DBSubject;

  if (!dbSubject) {
    redirect("/create");
  }

  return dbSubject;
}
