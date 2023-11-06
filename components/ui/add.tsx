import styles from "./add.module.scss";

export default function Add() {
  return (
    <div className={styles.addCont}>
      <input className={styles.input} placeholder="+ Add task Press ENTER" />
      <select className={styles.select} id="dateRange" name="dateRange">
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <div className={styles.addContArrow}></div>
    </div>
  );
}
