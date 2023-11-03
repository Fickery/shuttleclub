import TopMidContent from "@/components/top-mid-content";
import "./globals.css";
import Login from "./login/page";
import Link from "next/link";
import MidContent from "@/components/mid-content";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <div>
        <TopMidContent />
      </div>
      <MidContent />
    </div>
  );
}

{
  /* <h1 className="text-3xl font-bold text-center">NextAuth.js Example</h1>
      <p className="flex text-center gap-2">
        <Link href="/server-example" className="underline">
          Server
        </Link>{" "}
        and the{" "}
        <Link href="/client-example" className="underline">
          Client
        </Link>{" "}
        examples to see how to secure pages and get session data.
      </p> */
}
