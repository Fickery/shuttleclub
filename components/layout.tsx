import { SideNavBar } from "@/components/side-navbar";
import Taskbar from "@/components/task-content";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SideNavBar />
      {children}
      <Taskbar />
    </>
  );
}
