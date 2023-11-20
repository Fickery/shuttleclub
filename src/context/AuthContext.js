import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getAuth,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = async () => {
    if (!user) return false;

    try {
      const idTokenResult = await user.getIdTokenResult();
      return !!idTokenResult.claims.admin;
    } catch (error) {
      console.log("Error getting ID token result:", error);
      return false;
    }
  };

  //googleAuth
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //githubAuth
  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, googleSignIn, githubSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
