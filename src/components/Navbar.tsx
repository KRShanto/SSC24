"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      <h1 className="mt-5 text-center text-4xl max-[600px]:text-3xl">
        <Logo />
      </h1>

      <div>
        <nav className="mt-2 flex items-center justify-center text-2xl font-bold uppercase text-slate-300 max-[600px]:mt-5 max-[600px]:text-lg">
          <Link
            href="/"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900 max-[600px]:px-3 max-[600px]:py-1",
              pathname === "/" && "text-blue-500",
            )}
          >
            <FaHome />
            Home
          </Link>
          <Link
            href="/routine"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900 max-[600px]:px-3 max-[600px]:py-1",
              pathname === "/routine" && "text-blue-500",
            )}
          >
            <IoMdTimer />
            Routine
          </Link>
          <Link
            href="/settings"
            className={cn(
              "trasniton flex items-center gap-1 rounded-md px-5 py-2 duration-500 ease-in-out hover:bg-slate-900 max-[600px]:px-3 max-[600px]:py-1",
              pathname === "/settings" && "text-blue-500",
            )}
          >
            <IoSettings />
            Settings
          </Link>
        </nav>

        <hr className="mx-auto mt-2 w-[500px] border-slate-300 max-[600px]:mt-1 max-[600px]:w-[350px]" />
      </div>
    </div>
  );
}
