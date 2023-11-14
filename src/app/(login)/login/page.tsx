"use client";
import React from "react";
import { UserAuth } from "../../../context/AuthContext";

export default function Login() {
  const { user, googleSignIn, githubSignIn, logOut } = UserAuth();

  const handleGoogleSignIn = async (e: Event) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async (e: Event) => {
    e.preventDefault();
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-20 flex h-screen items-center justify-center text-black">
      <div className="w-[20%] border border-gray-100 shadow-sm">
        {user ? (
          <div className="">
            <p>Welcome, {user.displayName || user.email}!</p>
            <button onClick={logOut}>Logout</button>
          </div>
        ) : (
          // If user is not logged in, show login options
          <div className="text-center">
            <p className="whitespace-nowrap pt-10 text-4xl font-black tracking-tighter text-black">
              ShuttleClub
            </p>
            <p className="pt-1 text-sm">From tasks to triumph</p>
            {/* <div className="flex items-center justify-center gap-1">
              <p className="w-full cursor-pointer border-b px-5 py-1 text-sm lowercase hover:bg-gray-200">
                LOGIN
              </p>
              <p className="w-full cursor-pointer border-b px-5 py-1 text-sm lowercase hover:bg-gray-200">
                SIGN UP
              </p>
            </div> */}
            <div className="flex flex-col p-10">
              <div className="mx-auto flex w-full flex-col gap-3">
                <input
                  className="border-none bg-gray-100 placeholder:text-sm placeholder:text-gray-400 focus:border-gray-400"
                  type="text"
                  placeholder="username"
                />
                <input
                  className="border-none bg-gray-100 placeholder:text-sm placeholder:text-gray-400 focus:border-gray-400"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="mt-5 flex w-full flex-col gap-8">
                <button className="bg-gray-500 px-2 py-3 text-sm font-medium text-white hover:bg-gray-400">
                  LOGIN
                </button>
                <p className="text-xs text-gray-400">Or login with</p>
              </div>
              <div className="mx-auto mt-5 flex gap-4 text-xs">
                <button
                  className="border px-7 py-1 hover:bg-gray-100"
                  onClick={() => handleGoogleSignIn}
                >
                  Google
                </button>
                <button
                  className="border px-7 py-1 hover:bg-gray-100"
                  onClick={() => handleGithubSignIn}
                >
                  GitHub
                </button>
              </div>
              <button
                className="text-gray-40 pt-20 text-xs text-gray-500 hover:text-gray-400"
                onClick={() => handleGithubSignIn}
              >
                Get a new shuttle: Force Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
