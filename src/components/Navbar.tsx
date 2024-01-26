"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      {/* Navbar */}
      <div>
        <nav className="mt-5 flex items-center justify-center text-2xl font-bold uppercase text-slate-300 ">
          <Link
            href="/"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900",
              pathname === "/" && "text-blue-500",
            )}
          >
            <FaHome />
            Home
          </Link>
          <Link
            href="/routine"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900",
              pathname === "/routine" && "text-blue-500",
            )}
          >
            <IoMdTimer />
            Routine
          </Link>
          <Link
            href="/settings"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900",
              pathname === "/settings" && "text-blue-500",
            )}
          >
            <IoSettings />
            Settings
          </Link>
        </nav>

        <hr className="mx-auto mt-2 w-1/4 bg-slate-300" />
      </div>
    </div>
  );
}
