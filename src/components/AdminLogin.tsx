import firebase from "firebase/compat/app";
import router from "next/router";

export default function AdminLogin() {
  const handleAdminReg = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase
          .auth()
          .setCustomUserClaims(user, { role: "admin" })
          .then(() => {
            router.push("/login");
          })
          .catch((error) => {
            console.error("Registration error", error);
          });
      });
  };
  return <div>AdminLogin</div>;
}
