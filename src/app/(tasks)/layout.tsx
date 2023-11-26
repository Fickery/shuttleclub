"use client";
import NavBar from "@/components/Navbar";
import { AuthContextProvider, UserAuth } from "@/context/AuthContext";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import SessionProvider from "../SessionProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();

  return (
    <SessionProvider>
      <div className="flex w-full bg-white">
        {user && <NavBar />}
        {children}
      </div>
    </SessionProvider>
  );
}
