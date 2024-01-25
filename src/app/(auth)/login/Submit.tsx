"use client";

import { Submit } from "@/components/Form";
import { useFormErrorStore } from "@/stores/form-error";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "next-auth/react";

export default function SubmitButton() {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error === "CredentialsSignin") {
        showError({ field: "email", message: "Invalid email or password." });
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error: any) {
      showError({ field: "email", message: error.message });
      return;
    }
  };

  return <Submit formAction={handler}>Login</Submit>;
}
