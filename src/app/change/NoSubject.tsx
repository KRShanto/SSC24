import Link from "next/link";
import React from "react";

export default function NotSubject() {
  return (
    <div>
      <h2 className="mt-5 text-center text-4xl font-semibold text-red-600">
        You have not created any subjects yet
      </h2>

      <div className="mt-5 flex justify-center gap-5">
        <Link
          href="/create"
          className="mt-5 flex w-[220px] items-center justify-center gap-2 rounded-md bg-blue-800 py-2 text-xl font-semibold text-white"
        >
          Create Subjects
        </Link>
      </div>
    </div>
  );
}
