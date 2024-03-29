import Logo from "@/components/Logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="mt-5 text-center text-4xl font-bold max-[600px]:text-3xl">
        Welcome to <Logo />
      </h1>

      {children}
    </>
  );
}
