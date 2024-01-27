"use client";

import NextLink from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { useFormErrorStore } from "@/stores/form-error";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

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

export function Switch({
  label,
  name,
  value,
  setValue,
  width,
}: {
  label: string;
  name: string;
  value: boolean;
  setValue: (value: boolean) => void;
  width?: number;
}) {
  const { error } = useFormErrorStore();

  return (
    <div className="mt-4">
      <div className="flex justify-between" style={{ width }}>
        <label htmlFor={name} className="select-none">
          {label}
        </label>
        <div
          className="relative ml-5 inline-block h-5 w-14 cursor-pointer"
          onClick={() => setValue(!value)}
        >
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            className="hidden"
          />
          <span className="absolute left-0 top-0 h-6 w-full rounded-xl bg-slate-400"></span>
          <span
            className="absolute top-0 h-6 w-6 transform rounded-full"
            style={{
              transition: "transform 0.2s ease-in-out",
              transform: value ? "translateX(140%)" : "translateX(0)",
              backgroundColor: value ? "#0054ad" : "#24304d",
            }}
          ></span>
        </div>
      </div>

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
  colorType = "blue",
  className,
}: {
  children: React.ReactNode;
  formAction?: (formData: FormData) => Promise<void>;
  colorType?: "blue" | "red";
  className?: string;
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
      className={cn(
        "mt-10 flex h-10 w-full items-center justify-center rounded-md border text-lg text-white transition-all active:scale-95",

        colorType === "blue" && "border-blue-700 bg-blue-800 hover:bg-blue-700",
        colorType === "red" && "border-red-700 bg-red-800 hover:bg-red-700",
        className,
      )}
      type="submit"
      formAction={handler}
    >
      {pending ? <ThreeDots color="#fff" height="40" width="40" /> : children}
    </button>
  );
}
