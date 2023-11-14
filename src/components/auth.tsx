"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { auth } from "../lib/firebase/config";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;
          const user = result.user;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="fixed right-5 top-5">
      {isLoggedIn && (
        <>
          {/* <p className="text-green-500">{user.email}</p> */}
          <button className="text-red-500" onClick={() => auth.signOut()}>
            Logout
          </button>
        </>
      )}
      {!isLoggedIn && (
        <button className="flex items-center" onClick={() => handleAuth()}>
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
function useState<T>(arg0: null): [any, any] {
  throw new Error("Function not implemented.");
}
