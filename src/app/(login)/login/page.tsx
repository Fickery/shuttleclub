"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
} from "@nextui-org/react";
import { UserAuth } from "../../../context/AuthContext";
import "../../globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function Login() {
  const { user, googleSignIn, githubSignIn, logOut } = UserAuth();
  const [visible, setVisible] = useState(false);

  //HANDLER
  const closeHandler = () => {
    setVisible((prev) => !prev);
    console.log("modal handler called");
  };
  const router = useRouter();

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
          <div className="">/tasks</div>
        ) : (
          // If user is not logged in, show login options
          <div className="text-center">
            <p className="whitespace-nowrap pt-10 text-4xl font-black tracking-tighter text-black">
              ShuttleClub
            </p>
            <p className="pt-1 text-sm">From tasks to triumph</p>

            <div className="flex flex-col p-10">
              <form className="mx-auto flex w-full flex-col gap-3" action="">
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
              </form>

              <div className="mt-5 flex w-full flex-col gap-8">
                <button className="bg-gray-500 px-2 py-3 text-sm font-medium text-white hover:bg-gray-400">
                  LOGIN
                </button>
                <span className="mx-auto flex gap-1 text-xs text-gray-400">
                  <p>Don't have an admin account?</p>
                  <Button
                    onPress={closeHandler}
                    className="font-medium text-black hover:text-gray-500"
                  >
                    {" "}
                    Sign Up
                  </Button>
                  <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                  >
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Welcome to
                        <Text b size={18}>
                          NextUI
                        </Text>
                      </Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                      />
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                      />
                      <Row justify="space-between">
                        <Checkbox>
                          <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button auto flat color="error" onPress={closeHandler}>
                        Close
                      </Button>
                      <Button auto onPress={closeHandler}>
                        Sign in
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </span>

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
        )}
      </div>
    </div>
  );
}

{
  /* <span className="flex items-center justify-end gap-1">
                  <input
                    type="checkbox"
                    id="adminLoginCheckbox"
                    name="adminLogin"
                  />
                  <label
                    className="text-sm text-gray-500"
                    htmlFor="adminLoginCheckbox"
                  >
                    Admin
                  </label>
                </span> */
}
