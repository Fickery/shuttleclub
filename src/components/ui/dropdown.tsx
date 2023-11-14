"use client";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";
import { GoKebabHorizontal } from "react-icons/go";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickDelete = () => {
    // Handle delete action
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target && !(e.target as HTMLElement).closest(`.${styles.dropdown}`)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropDown}>
        <GoKebabHorizontal />
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul>
            <li onClick={handleClickDelete}>Delete</li>
            <li>Assign</li>
          </ul>
        </div>
      )}
    </div>
  );
}
