"use client";

import NextLink from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { useFormErrorStore } from "@/stores/form-error";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useFormStatus } from "react-dom";

export function Form({ children }: { children: React.ReactNode }) {
  return (
    <form className="mx-auto mt-52 w-[35rem] rounded-md border border-slate-700 p-5">
      {children}
    </form>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="my-5 text-center text-3xl font-bold">{children}</h1>;
}

export function Input({
  label,
  name,
  type,
  required,
  autoFocus,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const { error } = useFormErrorStore();

  return (
    <div className="mt-4">
      <label htmlFor={name} className="text-lg font-bold">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className="mt-1 block w-full rounded-md border border-slate-700 bg-transparent p-2 text-lg text-slate-300 outline-none focus:border-blue-500"
        required={required}
        autoFocus={autoFocus}
      />

      {error && error.field === name && (
        <p className="mt-2 animate-pulse text-sm font-semibold text-red-500 transition-all">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function Links({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-between">
      {children}
    </div>
  );
}

export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NextLink href={href} className="text-base text-blue-400">
      {children}
    </NextLink>
  );
}

export function Submit({
  children,
  formAction,
}: {
  children: React.ReactNode;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { pending } = useFormStatus();
  const { clearError } = useFormErrorStore();

  // reset the error state when the component is mounted
  useEffect(() => {
    clearError();
  }, []);

  const handler = async (data: FormData) => {
    // reset the error state when the button is clicked
    clearError();

    if (formAction) await formAction(data);
  };

  return (
    <button
      className="mt-10 flex h-10 w-full items-center justify-center rounded-md border border-blue-700 bg-blue-800 text-lg text-white transition-all active:scale-95"
      type="submit"
      formAction={handler}
    >
      {pending ? <ThreeDots color="#fff" height="40" width="40" /> : children}
    </button>
  );
}
