import NavBar from "@/components/Navbar";
import { AuthContextProvider, UserAuth } from "@/context/AuthContext";
import { DM_Sans } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = UserAuth();

  return (
    <AuthContextProvider>
      <html lang="en">
        <head>
          <title>ShuttleClub</title>
          <meta name="description" content="Description" />
        </head>
        <body className={dmSans.className}>
          <div className="flex bg-white">
            {user && <NavBar />}
            {children}
          </div>
        </body>
      </html>
    </AuthContextProvider>
  );
}
