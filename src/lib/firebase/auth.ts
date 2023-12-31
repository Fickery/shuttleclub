import { GithubAuthProvider } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./config";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

export type setCustomUserClaims = (
  uid: string,
  claims: object,
) => Promise<void>;

const admin = require("firebase-admin");
// const uid = "USER_ID";
// const claims = {
//   admin: true,
// };

onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is signed out");
  }
});

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Set the user's role to "master"
    await admin.auth().setCustomUserClaims(user.uid, {
      role: "master",
    });

    // Check if the user has the "master" role
    const idTokenResult = await user.getIdTokenResult();
    const isMaster = idTokenResult.claims.role === "master";

    console.log("Is user master?", isMaster);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInWithGithub() {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await admin.auth().setCustomUserClaims(user.uid, { role: "admin" });

    // Check if the user has the "master" role
    const idTokenResult = await user.getIdTokenResult();
    const isMaster = idTokenResult.claims.role === "master";

    console.log("Is user master?", isMaster);
  } catch (error) {
    console.error("Error signing in with Github", error);
  }
}

export async function getUserByUid(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

// Register a new user user passw
export async function registerUser(email, password, isAdmin = true) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      isAdmin,
    });
    return user;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
}

// Login an existing user w/ user and pass
export async function loginUser(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
}

// Sign up an admin user
export async function SignUpAdmin() {
  try {
    await registerUser("admin@example.com", "adminPassword", true);
    console.log("Admin user signed up successfully");
  } catch (error) {
    console.error("Error signing up admin user", error);
  }
}

// Sign up a non-admin user
export async function SignUpNonAdmin() {
  try {
    await registerUser("user@example.com", "userPassword", false);
    console.log("Non-admin user signed up successfully");
  } catch (error) {
    console.error("Error signing up non-admin user", error);
  }
}
function onAuthStateChanged(arg0: (user: any) => void) {
  throw new Error("Function not implemented.");
}
