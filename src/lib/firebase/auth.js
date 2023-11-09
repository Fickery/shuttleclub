import { GithubAuthProvider } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";

onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log("User is signed in");
  } else {
    // User is signed out.
    console.log("User is signed out");
  }
});

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInWithGithub() {
  const provider = new GithubAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Github", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
