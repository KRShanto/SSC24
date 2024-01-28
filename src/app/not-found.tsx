"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="mt-[15rem] flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-red-500 max-[400px]:text-4xl">
        404
      </h2>
      <p className="text-2xl max-[400px]:text-xl">Page not found</p>

      <div className="mt-14 flex flex-row items-center gap-5 max-[400px]:mt-9 max-[400px]:flex-col">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-base text-white max-[400px]:px-3 max-[400px]:py-1 max-[400px]:text-sm"
        >
          <FaBackward />
          Go back
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-base text-white max-[400px]:px-3 max-[400px]:py-1 max-[400px]:text-sm"
        >
          <FaHome />
          Go back home
        </Link>
      </div>
    </div>
  );
}
