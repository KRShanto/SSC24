import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

export default function Intro() {
  return (
    <div>
      <h1 className="mt-10 text-center text-5xl font-bold max-[800px]:text-4xl max-[500px]:text-3xl">
        Welcome to <Logo />
      </h1>

      <p className="mx-auto mt-5 w-[80vw] text-center text-2xl text-slate-300 max-[800px]:text-xl max-[500px]:text-lg">
        We know you&apos;ve been working hard, and we believe in you. Remember,
        the key to success is consistency and dedication. Keep up the good work,
        and you&apos;ll do great!
      </p>

      <p className="mx-auto mt-5 w-[80vw] text-center text-2xl text-slate-300 max-[800px]:text-xl max-[500px]:text-lg">
        On our website, you can keep track of your progress, and get notified
        every time your progress changes.
      </p>

      <h2 className="mt-10 text-center text-3xl font-bold text-slate-300 max-[800px]:text-2xl max-[500px]:text-xl">
        Good luck for your SSC exam in 2024!
      </h2>

      <div className="mt-10 flex items-center justify-center gap-10">
        <Link
          href="/register"
          className="btn-gradient rounded-md px-4 py-2 text-xl font-bold active:scale-95 max-[800px]:py-1 max-[800px]:text-base"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="btn-gradient rounded-md px-4 py-2 text-xl font-bold active:scale-95 max-[800px]:py-1 max-[800px]:text-base"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
