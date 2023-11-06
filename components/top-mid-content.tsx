"use client";
import Add from "./ui/add";
import Today from "./ui/today";
import styles from "./top-mid-content.module.scss";

export default function TopMidContent() {
  return (
    <div className={styles.mainCont}>
      <Today />
      <Add />
    </div>
  );
}
