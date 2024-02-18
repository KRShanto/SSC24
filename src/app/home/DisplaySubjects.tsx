import React from "react";
import { cn } from "@/lib/cn";
import ChangeForm from "./ChangeForm";
import { getSettings } from "@/lib/getSettings";
import { getSubjects } from "@/lib/getSubjects";
import { SUBJECTS } from "@/lib/const";
import { getUpcomingSubjects } from "@/lib/getUpcomingSubjects";

export default async function DisplaySubjects({
  userEmail,
}: {
  userEmail: string;
}) {
  // get the upcoming subjects from the database
  const upcomingSubjects = await getUpcomingSubjects({
    userEmail,
  });
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
      <div className="mb-10 mt-10 flex flex-col items-center gap-7 max-[800px]:gap-4">
        {upcomingSubjects!.map((subject, index) => (
          <div
            key={index}
            className={cn(
              "w-[40rem] rounded-md border-2 px-3 py-3 max-[800px]:w-[90vw] max-[800px]:border max-[800px]:px-2 max-[800px]:py-2",
              generateColor(subject.completed),
            )}
          >
            <h2 className="text-2xl font-bold text-slate-300 max-[800px]:text-xl">
              {subject.name}
            </h2>
            <ChangeForm subject={subject} userEmail={userEmail} />
          </div>
        ))}
      </div>
    </div>
  );
}
