// useAuth.ts
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/config";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLoggedIn(true);
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.displayName,
          photoUrl: authUser.photoURL,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return { user, isLoggedIn };
};

export default useAuth;
