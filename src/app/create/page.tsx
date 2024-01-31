import { SITE_NAME } from "@/lib/const";
import { auth } from "@/lib/auth";
import UnAuthenticated from "@/components/UnAuthenticated";
import { db } from "@/lib/firebase";
import CreateForm from "./CreateForm";
import AlreadyHaveMessage from "./AlreadyHaveMessage";
import { getSubjects } from "@/lib/getSubjects";

export const metadata = {
  title: `Create Subjects`,
  description: `Create your subjects`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreatePage() {
  const session = await auth();

  if (!session) return <UnAuthenticated />;

  // Check if the user has already created subjects
  const subjects = await getSubjects(session.user?.email!, false);

  if (subjects) return <AlreadyHaveMessage />;

  return <CreateForm userEmail={session.user?.email!} />;
}
