import { auth } from "@/lib/auth";
import Intro from "./home/Intro";
import Navbar from "@/components/Navbar";
import DisplaySubjects from "./home/DisplaySubjects";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export const metadata = {
  title: "Welcome to SSC24",
  description: "Welcome to SSC24",
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
