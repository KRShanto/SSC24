"use client";

import { useState } from "react";
import { COLLECTIONS, SUBJECTS } from "@/lib/const";
import { cn } from "@/lib/cn";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Submit } from "@/components/Form";
import { useRouter } from "next/navigation";

export default function CreateForm({ userEmail }: { userEmail: string }) {
  const [subjects, setSubjects] = useState<string[]>([]);
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

    router.push("/");
  }

  return (
    <form>
      <div className="flex flex-col space-y-2">
        <h2 className="mt-5 text-center text-2xl text-slate-300 max-[600px]:text-xl">
          Select the subjects you want to track your progress in.
        </h2>

        <div className="mx-auto flex w-[900px] flex-wrap justify-center gap-5 max-[1000px]:w-[90vw] max-[1000px]:gap-3 max-[600px]:gap-2">
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
                  "cursor-pointer select-none rounded-md px-5 py-2 text-2xl transition-all max-[1000px]:px-4 max-[1000px]:text-xl max-[600px]:text-lg",
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

      <div className="mx-auto mb-10 mt-20 w-[200px] max-[600px]:mt-14 max-[600px]:w-[150px]">
        <Submit formAction={handler}>Submit</Submit>
      </div>
    </form>
  );
}
