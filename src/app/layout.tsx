"use client";
import NavBar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AddTodo from "@/components/addTodo";
import Sidebar from "@/components/Sidebar";
import TodoList from "@/components/TodoList";

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
        <AuthContextProvider>
          <div className="flex bg-white">
            <NavBar />
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
