import Link from "next/link";
import styles from "./side-navbar.module.scss";
import SideProfile from "./ui/sidebar-profile";

export function SideNavBar() {
  return (
    <div className={styles.sidenavbarCont}>
      <SideProfile />
      <ul className="flex flex-col gap-12">
        <li className={styles.linksCont}>
          <Link href="/all-shuttles">All Shuttles</Link>
          <Link href="/available-now">Available Now</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href="/all-task">All Task</Link>
          <Link href="/outgoing">Outgoing</Link>
          <Link href="/upcoming">Upcoming</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href="/recurring">Recurring</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href="/completed">Completed</Link>
          <Link href="/trash">Trash</Link>
        </li>
      </ul>
    </div>
  );
}
