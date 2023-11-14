"use client";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useUserSession(initialUser: any) {
  // The initialUser comes from the server through a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: any) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser: { email: any }) => {
      if (user === undefined) return;
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
  }, [user]);

  return user;
}

export default function Header({ initialUser }: any) {
  const user = useUserSession(initialUser);

  const handleSignOut = (e: MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  const handleSignIn = (e: MouseEvent) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <header>
      <Link href="/" className="logo">
        <img src="/friendly-eats.svg" alt="FriendlyEats" />
        Friendly Eats
      </Link>
      {user ? (
        <>
          <div className="profile">
            <p>
              <img src="/profile.svg" alt={user.email} />
              {user.displayName}
            </p>

            <div className="menu">
              ...
              <ul>
                <li>{user.displayName}</li>
                <li>
                  <a href="#" onClick={() => handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <a href="#" onClick={() => handleSignIn}>
          Sign In with Google
        </a>
      )}
    </header>
  );
}
