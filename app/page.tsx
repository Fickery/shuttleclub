import TopMidContent from "@/components/top-mid-content";
import "./globals.css";
import Login from "./login/page";
import Link from "next/link";
import MidContent from "@/components/mid-content";

export default function Home() {
  return (
    <div className="h-full w-4/6 flex flex-col">
      <MidContent />
    </div>
  );
}
