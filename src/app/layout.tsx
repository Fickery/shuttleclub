"use client";
import { AuthContextProvider } from "@/context/AuthContext";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>ShuttleClub</title>
        <meta name="description" content="Description" />
      </head>
      <body className={dmSans.className}>
        <Providers>
          <AuthContextProvider>
            <div className="flex bg-white text-black">{children}</div>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
