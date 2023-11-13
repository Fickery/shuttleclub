import React from "react";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const { user, googleSignIn, githubSignIn, logOut } = UserAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        // If user is not logged in, show login options
        <div>
          <p>Please log in:</p>
          <button onClick={googleSignIn}>Login with Google</button>
          <button onClick={githubSignIn}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
}
