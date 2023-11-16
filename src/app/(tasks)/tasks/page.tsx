"use client";
import Login from "@/app/(login)/login/page";
import TodoContent from "@/components/TodoContent";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import { UserAuth } from "@/context/AuthContext";
import { SetStateAction, useState } from "react";

export default function Tasks() {
  const { user } = UserAuth();

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task: SetStateAction<null>) => {
    setSelectedTask(task);
  };

  return (
    <main className="flex min-h-screen w-full">
      {user ? (
        <>
          <div className="flex h-full w-3/4 flex-col items-center gap-5 bg-white p-20 text-black">
            <AddTodo />
            <p className="w-full pt-5 text-start text-3xl font-black">
              All Task
            </p>
            <TodoList onTaskClick={handleTaskClick} />
          </div>

          <div className="w-1/5 py-20 text-black">
            <TodoContent selectedTask={selectedTask} />
          </div>
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
