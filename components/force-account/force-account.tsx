import styles from "@/components/force-account/page.module.scss";

export default function ForceAccount() {
  return (
    <div className={styles.loginCont}>
      <p className={styles.title}>SHUTTLECLUB</p>
      <p className={styles.brandWords}>Force an account</p>

      <form action="">
        <input
          className={styles.btnInput}
          type="number"
          name="username"
          id=""
          placeholder="Phone number"
        />
        <input
          className={styles.btnInput}
          type="text"
          name="password"
          id=""
          placeholder="Name"
        />
        <input
          className={styles.btnInput}
          type="6"
          name="password"
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
        <input
          className={styles.btnInput}
          type="text"
          name="password"
          id=""
          placeholder="Comfirm password"
        />
      </form>
      <button className={styles.loginBtn}>Force Create</button>
      <div className={styles.logUtil}>
        <p>Create account</p>
        <p>Force an account</p>
      </div>
    </div>
  );
}
