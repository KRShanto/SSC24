"use client";

import { useFormErrorStore } from "@/stores/form-error";
import { register } from "../../../actions/register";
import { useRouter } from "next/navigation";
import { Submit } from "@/components/Form";
import { firebaseAuth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signIn } from "next-auth/react";
import { sendWelcomeEmail } from "@/actions/sendWelcomeEmail";

export default function SubmitButton() {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handler = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      // create user profile
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.email!), {
        name,
        email,
        createdAt: new Date(),
      });

      // sign in with next-auth
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        showError({ field: "email", message: res.error });
        return;
      }

      // Send welcome email
      await sendWelcomeEmail({ name, email });

      router.push("/create");
      router.refresh();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        showError({
          field: "email",
          message: "The email address is already in use by another account.",
        });
      } else {
        showError({ field: "email", message: error.message });
      }

      return;
    }
  };

  return <Submit formAction={handler}>Register</Submit>;
}
