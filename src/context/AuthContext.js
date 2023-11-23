// import { admin } from "@/lib/firebase/adminConfig";
import { auth } from "@/lib/firebase/config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // const isAdmin = async () => {
  //   if (!user) return false;

  //   try {
  //     const idTokenResult = await user.getIdTokenResult();
  //     return !!idTokenResult.claims.admin;
  //   } catch (error) {
  //     console.log("Error getting ID token result:", error);
  //     return false;
  //   }
  // };

  // const createMasterAccount = async (email, password) => {
  //   await firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Set the user's role to "master"
  //       firebase.auth().currentUser.customClaims({
  //         role: "master",
  //       });
  //       return userCredential.user;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const createNonMasterAccountWithPhone = async (phoneNumber) => {
  //   const role = "non-master";

  //   await firebase
  //     .auth()
  //     .createUserWithPhoneNumber(phoneNumber)
  //     .then((userCredential) => {
  //       // Set the user's role to "non-master"
  //       firebase.auth().currentUser.customClaims({
  //         role: role,
  //       });
  //       return userCredential.user;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const createUserWithEmailAndPassword = async (email, password) => {
  //   await firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       return userCredential.user;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // GoogleAuth
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  // githubAuth
  const githubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Github", error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        // isAdmin,
        // createMasterAccount,
        // createNonMasterAccountWithPhone,
        googleSignIn,
        githubSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
