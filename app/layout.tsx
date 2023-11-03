import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideNavBar } from "@/components/side-navbar";
import Taskbar from "@/components/taskbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="w-screen h-screen flex items-center justify-between p-8">
          <SideNavBar />
          {children}
          <Taskbar />
        </div>
      </body>
    </html>
  );
}
