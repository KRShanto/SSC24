import Navbar from "@/components/Navbar";
import UnAuthenticated from "@/components/UnAuthenticated";
import { auth } from "@/lib/auth";
import { getSettings } from "@/lib/getSettings";
import SettingsForm from "./SettingsForm";
import { Settings } from "@/lib/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Change your settings",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session) return <UnAuthenticated />;

  const settings = (await getSettings(session.user?.email!)) as Settings;

  return (
    <div>
      <Navbar />
      <SettingsForm settings={settings} userEmail={session.user?.email!} />
    </div>
  );
}
