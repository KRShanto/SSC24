import { db, firebaseAuth } from "@/lib/firebase";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SITE_NAME } from "@/lib/const";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, collection, setDoc, doc } from "firebase/firestore";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: SITE_NAME,
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
          );
          const user = userCredential.user;

          console.log(user);

          if (user) {
            // fetch user profile
            const docRef = doc(db, "users", user.email!);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                email: user.email,
                name: docSnap.data().name,
                picture: user.photoURL,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // save user profile when user signs in using google
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const { name, email } = profile as {
          name: string;
          email: string;
        };

        try {
          await setDoc(doc(db, "users", email), {
            name,
            email,
          });
        } catch (error) {
          console.log(error);
        }
      }

      return true;
    },
  },
});
