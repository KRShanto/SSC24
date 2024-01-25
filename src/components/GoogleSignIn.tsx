"use client";

import { db, firebaseAuth, googleProvider } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useFormErrorStore } from "@/stores/form-error";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleSignIn() {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  async function handler() {
    try {
      // const result = await signInWithPopup(firebaseAuth, googleProvider);

      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // const user = result.user;

      // sign in with next-auth
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error: any) {
      showError({ field: "email", message: error.message });
      return;
    }
  }

  return (
    <button
      className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800 text-lg text-white transition-all active:scale-95"
      type="button"
      onClick={handler}
    >
      <Image alt="Google Icon" src="/google.svg" width={20} height={20} />
      Sign in with Google
    </button>
  );
}
