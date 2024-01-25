import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";

export default function AlreadyHaveMessage() {
  return (
    <div>
      <h2 className="mt-5 text-center text-4xl font-semibold text-blue-300">
        Subjects already created
      </h2>

      <div className="mt-10 flex justify-center gap-5">
        <Link
          href="/"
          className="mt-5 flex w-[180px] items-center justify-center gap-2 rounded-md bg-blue-500 py-2 text-xl font-semibold text-white"
        >
          <FaHome />
          Go to Home
        </Link>
        <Link
          href="/change"
          className="mt-5 flex w-[220px] items-center justify-center gap-2 rounded-md bg-blue-800 py-2 text-xl font-semibold text-white"
        >
          <MdChangeCircle />
          Change Subjects
        </Link>
      </div>
    </div>
  );
}