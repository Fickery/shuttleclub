"use client";
import RegisterModal from "@/components/ui/RegisterModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { UserAuth } from "../../../context/AuthContext";
import "../../globals.css";

export default function Login() {
  const { user, googleSignIn, githubSignIn, logOut } = UserAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //HANDLER
  const router = useRouter();

  const handleRegisterModalOpen = () => {
    onOpen();
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async (e) => {
    e.preventDefault();
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  //USEEFECT
  useEffect(() => {
    if (user) {
      router.push("/tasks");
    }
  }, [user]);

  return (
    <div className="flex h-screen w-full items-center justify-center text-black">
      <div className="w-[20%] border border-gray-100 shadow-sm">
        {user ? (
          // If user is not logged in, show login options
          <div className="text-center">
            <p className="whitespace-nowrap pt-10 text-4xl font-black tracking-tighter text-black">
              ShuttleClub
            </p>
            <p className="pt-1 text-sm">From tasks to triumph</p>

            <div className="flex flex-col p-10">
              <form className="mx-auto flex w-full flex-col gap-3" action="">
                <input
                  className="border-gray-200 text-xs text-gray-500 placeholder:text-sm placeholder:text-gray-400 hover:text-gray-400"
                  type="text"
                  placeholder="username"
                />
                <input
                  className="border-gray-200 text-xs text-gray-500 placeholder:text-sm placeholder:text-gray-400 hover:text-gray-400"
                  type="password"
                  placeholder="password"
                />
              </form>

              <div className="mt-5 flex w-full flex-col gap-8">
                <button className="bg-gray-500 px-2 py-3 text-sm font-medium text-white hover:bg-gray-400">
                  LOGIN
                </button>
                <span className="mx-auto flex gap-1 text-xs text-gray-400">
                  <p>Don't have an admin account?</p>
                  <Button
                    onClick={handleRegisterModalOpen}
                    className="font-medium text-black hover:text-gray-500"
                  >
                    {" "}
                    Sign Up
                  </Button>
                </span>

                {/******** REGISTER ADMIN MODAL *********/}
                <RegisterModal isOpen={isOpen} onClose={onClose} />

                <div className="flex items-center text-gray-400">
                  <hr className="flex-grow border-t border-gray-200" />
                  <span className="mx-4 text-xs">or login with</span>
                  <hr className="flex-grow border-t border-gray-200" />
                </div>
              </div>

              <div className="mx-auto mt-5 flex gap-4 text-xs">
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

              <button
                className="text-gray-40 pt-5 text-xs text-gray-500 hover:text-gray-400"
                onClick={handleGithubSignIn}
              >
                Get a new shuttle: Force Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="">/tasks</div>
        )}
      </div>
    </div>
  );
}
