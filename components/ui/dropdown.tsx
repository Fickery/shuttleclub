"use client";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";

export default function Dropdown({ onDelete }) {
  const handleClickDelete = () => {
    onDelete();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(`.${styles.dropdown}`) === null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropDown}>
        &#x22ef;
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
