import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/config";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });
  return { user, isLoggedIn };
};
export default useAuth;