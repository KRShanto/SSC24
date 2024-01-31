import UnAuthenticated from "@/components/UnAuthenticated";
import { auth } from "@/lib/auth";
import { getSubjects } from "@/lib/getSubjects";
import React from "react";
import NoSubject from "./NoSubject";
import ChangeForm from "./ChangeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Subjects",
  description: "Change your subjects",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ChangePage() {
  const session = await auth();

  if (!session) return <UnAuthenticated />;

  // Check if the user has already created subjects
  const subjects = await getSubjects(session.user?.email!, false);

  if (!subjects) return <NoSubject />;

  const subjectsNames = subjects.map((subject) => subject.name);

  return (
    <ChangeForm userEmail={session.user?.email!} subjects={subjectsNames} />
  );
}
