"use client";
import { useState } from "react";
import mockData from "../../app/mockData";
import Dropdown from "./dropdown";
import styles from "./taskbox.module.scss";
import Taskbar from "../task-content";

export default function Taskbox() {
  const [tasks, setTasks] = useState(mockData);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(`Delete task with id ${id}`);
  };

  const onClick = (id: number) => {
    console.log(`click ${id}`);
  };

  const truncate = (description: string) => {
    return description.length >= 50
      ? description.substring(0, 100) + "..."
      : description;
  };
  return (
    <ul className={styles.taskbox}>
      {tasks.map((user) => (
        <li
          className={styles.taskboxCont}
          key={user.id}
          onClick={() => onClick(user.id)}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-black">{user.name}</p>
              <Dropdown onDelete={() => handleDelete(user.id)} />
            </div>
            <p className="text-lg mb-8">{truncate(user.description)}</p>
            <p className="w-fit text-sm uppercase font-bold py-2 px-3 bg-[black] text-white">
              {user.due}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
