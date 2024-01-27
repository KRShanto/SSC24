"use client";

import { Submit } from "@/components/Form";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ChangeForm({
  subject,
  userEmail,
}: {
  subject: {
    name: string;
    completed: number;
  };
  userEmail: string;
}) {
  const [completed, setCompleted] = useState(subject.completed);
  const router = useRouter();

  // update the subject in the database
  // where userEmail == userEmail && name == subject.name
  async function handleSubmit(_: FormData) {
    // check if completed is the previous value
    if (completed === subject.completed) return;

    const q = query(
      collection(db, "subjects"),
      where("userEmail", "==", userEmail),
    );
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;
    const data = querySnapshot.docs[0].data();
    const newSubject = {
      name: subject.name,
      completed,
    };
    const newSubjects = data.subjects.map((subject: any) => {
      if (subject.name === newSubject.name) {
        return newSubject;
      } else {
        return subject;
      }
    });
    await setDoc(docRef, { subjects: newSubjects }, { merge: true });
    router.refresh();
  }

  return (
    <form className="mt-3 flex items-center justify-between gap-5 text-slate-300">
      <p className="inline text-lg">{completed}%</p>
      <input
        type="range"
        min="0"
        max="100"
        className="w-full"
        value={completed}
        onChange={(e) => {
          setCompleted(parseInt(e.target.value));
        }}
      />

      <Submit formAction={handleSubmit} className="mt-0 h-7 w-20">
        <FaSave />
      </Submit>
    </form>
  );
}
