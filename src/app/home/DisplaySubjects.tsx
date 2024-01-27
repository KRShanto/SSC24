import React from "react";
import { cn } from "@/lib/cn";
import ChangeForm from "./ChangeForm";
import { getSettings } from "@/lib/getSettings";
import { getSubjects } from "@/lib/getSubjects";

export default async function DisplaySubjects({
  userEmail,
}: {
  userEmail: string;
}) {
  // get the subjects from the database
  const dbSubject = await getSubjects(userEmail);
  // get the settings from the database
  const settings = await getSettings(userEmail);

  function generateColor(completed: number) {
    if (!settings.subjectsColorHighlight) {
      return "border-slate-700";
    }

    if (completed >= 80) {
      return "border-green-400";
    } else if (completed >= 60) {
      return "border-green-900";
    } else if (completed >= 30) {
      return "border-yellow-500";
    } else {
      return "border-red-700";
    }
  }

  return (
    <div>
      <div className="mb-10 mt-10 flex flex-col items-center gap-7">
        {dbSubject.subjects.map((subject, index) => (
          <div
            key={index}
            className={cn(
              "w-[40rem] rounded-md border-2 px-3 py-3",
              generateColor(subject.completed),
            )}
          >
            <h2 className="text-2xl  font-bold">{subject.name}</h2>
            <ChangeForm subject={subject} userEmail={userEmail} />
          </div>
        ))}
      </div>
    </div>
  );
}
