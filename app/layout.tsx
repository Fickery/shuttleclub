import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SideNavBar } from "@/components/side-navbar";
import Taskbar from "@/components/task-content";
import TopMidContent from "@/components/top-mid-content";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shuttleclub",
  description: "A club for shuttling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <div className="w-screen h-screen grid grid-cols-[250px_minmax(900px,_1fr)] p-10">
          <SideNavBar />
          <div className="w-full h-full flex flex-col pl-[5rem] pr-[5rem]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
