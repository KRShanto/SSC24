import { auth } from "@/lib/auth";
import Intro from "./home/Intro";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Welcome to SSC24",
  description: "Welcome to SSC24",
};

export default function Home() {
  const session = auth();

  if (!session) return <Intro />;

  return (
    <>
      <Navbar />
      home
    </>
  );
}
