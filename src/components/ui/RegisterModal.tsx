import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../lib/firebase/config";
import { X } from "react-feather";

export default async function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth.currentUser.email);

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <Modal
      className="bg-white text-black shadow-[rgba(0,_0,_0,_0.30)_0px_4px_20px]"
      classNames={{
        backdrop: "bg-black bg-opacity-20",
      }}
      backdrop="opaque"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={() => onClose()}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="relative border-b-[1px] font-light">
              <X className="absolute w-5 cursor-pointer" onClick={onClose} />
              <p className="w-screen text-center">Admin Sign up</p>
            </ModalHeader>
            <ModalBody className="px-12 pb-10">
              <p className="py-5 text-center text-2xl font-black">
                Welcome to the ShuttleClub
              </p>
              <input
                type="email"
                placeholder="Email"
                className="border-gray-300 text-sm placeholder:text-gray-400"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                className="border-gray-300 text-sm placeholder:text-gray-400"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Comfirm password"
                className="border-gray-300 text-sm placeholder:text-gray-400"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="mx-auto flex gap-1 py-5 text-sm text-gray-400">
                <p>Already have an account?</p>
                <p
                  className="cursor-pointer text-black hover:underline"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Login
                </p>
              </span>
              <button
                className="mb-2 bg-gray-500 py-5 text-sm font-medium uppercase text-white hover:bg-gray-400"
                onClick={signIn}
              >
                Sign up
              </button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
