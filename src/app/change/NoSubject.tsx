import Link from "next/link";
import React from "react";

export default function NotSubject() {
  return (
    <div>
      <h2 className="mt-5 text-center text-4xl font-semibold text-red-500 max-[600px]:text-2xl">
        You have not created any subjects yet
      </h2>

      <div className="mt-5 flex justify-center gap-5">
        <Link
          href="/create"
          className="mt-5 flex w-[220px] items-center justify-center gap-2 rounded-md bg-blue-800 py-2 text-xl font-semibold text-white max-[600px]:w-[190px] max-[600px]:py-1 max-[600px]:text-lg"
        >
          Create Subjects
        </Link>
      </div>
    </div>
  );
}
