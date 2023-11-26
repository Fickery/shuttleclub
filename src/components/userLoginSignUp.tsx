"use client";
import RegisterModal from "@/components/ui/RegisterModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import "../app/globals.css";
import { UserAuth } from "../context/AuthContext";

export default function UserLoginSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signInEmail, googleSignIn, githubSignIn } = UserAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // HANDLER
  const router = useRouter();

  const handleRegisterModalOpen = () => {
    onOpen();
  };

  const handleEmailPasswordSignIn: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      await signInEmail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <p className="whitespace-nowrap pt-10 text-3xl font-black tracking-tighter text-black">
        ShuttleClub
      </p>
      <p className="pt-1 text-sm md:text-base">From tasks to triumph</p>

      <div className="flex flex-col p-4 lg:p-10">
        <form className="mx-auto flex w-full flex-col gap-3" action="">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-200 text-xs text-gray-500 placeholder:text-sm placeholder:text-gray-400 hover:text-gray-400"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-200 text-xs text-gray-500 placeholder:text-sm placeholder:text-gray-400 hover:text-gray-400"
          />
          <button className="w-fit text-left text-xs text-black hover:text-gray-500">
            Forgot Password?
          </button>
        </form>

        {/* Login Button */}
        <button
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              redirect: true,
              callbackUrl: "/tasks",
            })
          }
          disabled={!email || !password}
          className="mt-5 bg-gray-500 px-2 py-3 text-sm font-medium text-white hover:bg-gray-400 md:text-base"
        >
          LOGIN
        </button>

        <div className="mt-10 flex w-full gap-5">
          <span className="mx-auto flex gap-1 text-xs text-gray-400 max-xl:flex-col">
            <p>Don't have an admin account?</p>
            <Button
              onClick={handleRegisterModalOpen}
              className="font-medium text-black hover:text-gray-500"
            >
              Sign Up
            </Button>
          </span>
          <RegisterModal isOpen={isOpen} onClose={onClose} />
        </div>

        <div className="mt-10 flex items-center text-gray-400">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="mx-4 text-xs">or login with</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        {/* Social Media Buttons */}
        <div className="mx-auto mt-5 flex flex-row gap-4 text-xs">
          <button
            className="flex items-center gap-2 border px-7 py-1 hover:bg-gray-200"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle />
            Google
          </button>
          <button
            className="flex items-center gap-2 border px-7 py-1 hover:bg-gray-200"
            onClick={handleGithubSignIn}
          >
            <FaGithub />
            GitHub
          </button>
        </div>

        <p className="text-gray-40 pt-5 text-xs text-gray-500">
          <span>Get a new shuttle: </span>
          <span className="cursor-pointer text-black hover:text-gray-400">
            Force Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
