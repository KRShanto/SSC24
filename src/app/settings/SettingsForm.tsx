"use client";

import { Form, Submit, Switch } from "@/components/Form";
import { cn } from "@/lib/cn";
import { COLLECTIONS, Settings } from "@/lib/const";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { revalidate } from "@/actions/revalidate";
import { MdChangeCircle } from "react-icons/md";
import Link from "next/link";

export default function SettingsForm({
  settings,
  userEmail,
}: {
  settings: Settings;
  userEmail: string;
}) {
  const [emailNotification, setEmailNotification] = useState(
    settings.emailNotification,
  );
  const [subjectsColorHighlight, setSubjectsColorHighlight] = useState(
    settings.subjectsColorHighlight,
  );

  const handleSave = async (formData: FormData) => {
    const newSettings = {
      emailNotification,
      subjectsColorHighlight,
    };

    const docRef = doc(db, COLLECTIONS.SETTINGS, userEmail);
    await setDoc(docRef, newSettings, { merge: true });
    revalidate("/");
  };

  const handleSignOut = async (formData: FormData) => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <form className="mx-auto mt-10 w-fit text-2xl font-semibold text-slate-400">
        <Switch
          label="Send Email Notification"
          name="emailNotification"
          value={emailNotification}
          setValue={setEmailNotification}
          width={500}
        />

        <Switch
          label="Highlight Subjects with colors"
          name="subjectsColorHighlight"
          value={subjectsColorHighlight}
          setValue={setSubjectsColorHighlight}
          width={500}
        />

        <Submit formAction={handleSave}>Save</Submit>
      </form>

      <Link
        href="/change"
        className="mx-auto mt-5 flex w-64 items-center justify-center gap-1 rounded-md bg-violet-600 px-4 py-2 text-xl"
      >
        <MdChangeCircle className="text-lg" />
        Change Subjects
      </Link>

      <form className="mx-auto w-56">
        <Submit colorType="red" formAction={handleSignOut} className="mt-2">
          <BiLogOut className="mr-2" />
          Sign Out
        </Submit>
      </form>
    </div>
  );
}
