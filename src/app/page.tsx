import { auth } from "@/lib/auth";
import Intro from "./home/Intro";
import Navbar from "@/components/Navbar";
import DisplaySubjects from "./home/DisplaySubjects";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { SITE_NAME } from "@/lib/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Welcome to ${SITE_NAME}`,
  description: `${SITE_NAME} is a website for candidates of SSC exam in 2024. On our website, you can keep track of your progress, and get notified
  every time your progress changes.`,
  keywords: [
    "SSC",
    "SSC Exam",
    "SSC Exam 2024",
    "SSC Exam 2024 Candidates",
    "ssc",
    "ssc exam",
    "ssc exam 2024",
    "ssc exam 2024 candidates",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Welcome to ${SITE_NAME}`,
    description: `${SITE_NAME} is a website for candidates of SSC exam in 2024. On our website, you can keep track of your progress, and get notified
    every time your progress changes.`,
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    siteName: SITE_NAME,
  },
};

export default async function Home() {
  const session = await auth();

  if (!session) return <Intro />;

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <DisplaySubjects userEmail={session.user?.email!} />
      </Suspense>
    </>
  );
}
