import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { X } from "react-feather";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase/config";
import { useRouter } from "next/navigation";

export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { createEmailUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // console.log(auth.currentUser.email);
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await createEmailUser(auth, email, password);
      router.push("/login");
      console.log("success");
    } catch (error) {
      console.error(error);
    }
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="border-gray-300 text-sm placeholder:text-gray-400"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <input
                  required
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="border-gray-300 text-sm placeholder:text-gray-400"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Comfirm password"
                  value={confirmPassword}
                  className="border-gray-300 text-sm placeholder:text-gray-400"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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
                  type="submit"
                  className="mb-2 bg-gray-500 py-5 text-sm font-medium uppercase text-white hover:bg-gray-400"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
