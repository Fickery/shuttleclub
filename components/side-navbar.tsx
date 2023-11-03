import Link from "next/link";
import styles from "./side-navbar.module.scss";
import SideProfile from "./ui/sidebar-profile";

export function SideNavBar() {
  return (
    <div className={styles.sidenavbarCont}>
      <SideProfile />
      <ul className="flex flex-col gap-12">
        <li className={styles.linksCont}>
          <Link href={""}>All Shuttles</Link>
          <Link href={""}>Available Now</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href="/all-task">All Task</Link>
          <Link href={""}>Outgoing</Link>
          <Link href={""}>Upcoming</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href={""}>Recurring</Link>
        </li>
        <li className={styles.linksCont}>
          <Link href={""}>Completed</Link>
          <Link href={""}>Trash</Link>
        </li>
      </ul>
    </div>
  );
}
