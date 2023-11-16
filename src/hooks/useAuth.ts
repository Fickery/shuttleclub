import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/config";

type User = {
  uid: string;
  email: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);

      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
        });
      } else {
        window.location.href = "/login";
      }
    });

    return unsubscribe;
  }, []);

  return { user, isLoggedIn };
};

export default useAuth;
