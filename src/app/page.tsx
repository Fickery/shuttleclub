"use client";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import Login from "./(login)/login/page";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, googleSignIn, githubSignIn, logOut } = UserAuth();

  return (
    <div>
      <div className="flex w-screen">
        <Login />
      </div>
    </div>
  );
}
