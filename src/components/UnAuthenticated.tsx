import Link from "next/link";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";

export default function UnAuthenticated() {
  return (
    <>
      <h1 className="mt-10 text-center text-3xl font-bold text-red-500">
        <CgDanger className="inline-block" />
        &nbsp;You are not authenticated. Please login to continue.
      </h1>

      <div className="mt-10 flex justify-center gap-5">
        <Link
          href="/"
          className="mt-5 flex w-[180px] items-center justify-center gap-2 rounded-md bg-blue-500 py-2 text-xl font-semibold text-white"
        >
          <FaHome />
          Go to Home
        </Link>
        <Link
          href="/login"
          className="mt-5 flex w-[220px] items-center justify-center gap-2 rounded-md bg-green-700 py-2 text-xl font-semibold text-white"
        >
          <MdOutlineLogin />
          Go to Login
        </Link>
      </div>
    </>
  );
}
