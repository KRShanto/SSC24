import { SITE_NAME } from "@/lib/const";
import { auth } from "@/lib/auth";
import { where, query, getDocs, collection } from "firebase/firestore";
import UnAuthenticated from "@/components/UnAuthenticated";
import { db } from "@/lib/firebase";
import CreateForm from "./CreateForm";
import AlreadyHaveMessage from "./AlreadyHaveMessage";

export const metadata = {
  title: `Create Subjects | ${SITE_NAME}`,
};

export default async function CreatePage() {
  const session = await auth();

  if (!session) return <UnAuthenticated />;

  // Check if the user has already created subjects
  const q = query(
    collection(db, "subjects"),
    where("userEmail", "==", session.user?.email),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) return <AlreadyHaveMessage />;

  return <CreateForm userEmail={session.user?.email!} />;
}
