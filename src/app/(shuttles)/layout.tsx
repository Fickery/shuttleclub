"use client";
import { AuthContextProvider, UserAuth } from "@/context/AuthContext";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();
  return (
    <html lang="en">
      <head>
        <title>ShuttleClub</title>
        <meta name="description" content="Description" />
      </head>
      <body className={dmSans.className}>
        <AuthContextProvider>
          <div className="flex bg-white">
            {user && <NavBar />}
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
