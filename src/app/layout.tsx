import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Rubik_Doodle_Shadow } from "next/font/google";
import TopLoader from "@/components/TopLoader";
import { SITE_NAME } from "@/lib/const";

const inter = Inter({ subsets: ["latin"] });
const rubik = Rubik_Doodle_Shadow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}`,
  },
  authors: [
    {
      name: "KR Shanto",
      url: "https://krshanto.me",
    },
  ],
  creator: "KR Shanto",
  publisher: "KR Shanto",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${rubik.variable}`}>
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
