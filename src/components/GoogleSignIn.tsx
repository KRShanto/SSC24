"use client";

import { db, firebaseAuth, googleProvider } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useFormErrorStore } from "@/stores/form-error";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleSignIn({
  callbackUrl = "/",
}: {
  callbackUrl?: string;
}) {
  const { showError } = useFormErrorStore();

  async function handler() {
    try {
      // sign in with next-auth
      await signIn("google", {
        callbackUrl,
      });
    } catch (error: any) {
      showError({ field: "email", message: error.message });
      return;
    }
  }

  return (
    <button
      className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800 text-lg text-white transition-all active:scale-95 max-[500px]:h-8 max-[500px]:text-base"
      type="button"
      onClick={handler}
    >
      <Image alt="Google Icon" src="/google.svg" width={15} height={15} />
      Sign in with Google
    </button>
  );
}
