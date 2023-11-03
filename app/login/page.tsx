import styles from "./page.module.scss";

export default function page() {
  return (
    <div className={styles.loginCont}>
      <p className={styles.title}>SHUTTLECLUB</p>
      <p className={styles.brandWords}>From Tasks to Triumph</p>

      <input
        className={styles.btnInput}
        type="text"
        name="username"
        id=""
        placeholder="Username"
      />
      <input
        className={styles.btnInput}
        type="text"
        name="password"
        id=""
        placeholder="Password"
      />
      <p className={styles.forgotPw}>Forgot password?</p>
      <button className={styles.loginBtn}>Continue</button>
      <div className={styles.logUtil}>
        <p>Create account</p>
        <p>Force an account</p>
      </div>
    </div>
  );
}
