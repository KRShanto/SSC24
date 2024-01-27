"use client";

import { useState } from "react";
import { COLLECTIONS, SUBJECTS } from "@/lib/const";
import { cn } from "@/lib/cn";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Submit } from "@/components/Form";
import { useRouter } from "next/navigation";
import { revalidate } from "@/actions/revalidate";

export default function ChangeForm({
  userEmail,
  subjects: oldSubjects,
}: {
  userEmail: string;
  subjects: string[];
}) {
  const [subjects, setSubjects] = useState<string[]>(oldSubjects);
  const router = useRouter();

  async function handler() {
    if (subjects.length === 0) return;

    const docRef = doc(db, COLLECTIONS.SUBJECTS, userEmail);
    await setDoc(docRef, {
      subjects: subjects.map((subject) => ({
        name: subject,
        completed: 0,
      })),
    });

    revalidate("/");
    router.push("/");
  }

  return (
    <form>
      <div className="flex flex-col space-y-2">
        <h2 className="mt-5 text-center text-2xl text-slate-300">
          Select the subjects you want to track your progress in.
        </h2>

        <div className="mx-auto flex w-[900px] flex-wrap justify-center gap-5">
          {SUBJECTS.map((subject, index) => (
            <div key={index} className="mt-5">
              <input
                type="checkbox"
                id={subject.name}
                name={subject.name}
                checked={subjects.includes(subject.name)}
                className="hidden"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSubjects([...subjects, subject.name]);
                  } else {
                    setSubjects(subjects.filter((s) => s !== subject.name));
                  }
                }}
              />

              <label
                htmlFor={subject.name}
                className={cn(
                  "cursor-pointer select-none rounded-md px-5 py-2 text-2xl transition-all",
                  {
                    "border border-blue-500 bg-blue-800 text-white":
                      subjects.includes(subject.name),
                    "bg-slate-900 text-slate-300": !subjects.includes(
                      subject.name,
                    ),
                  },
                )}
              >
                {subject.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 w-[200px]">
        <Submit formAction={handler}>Submit</Submit>
      </div>
    </form>
  );
}
