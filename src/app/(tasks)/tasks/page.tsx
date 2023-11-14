"use client";
import TodoContent from "@/components/TodoContent";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import { Section } from "@/components/ui/Section";
import { useState } from "react";
import { TodoProps } from "@/app/api/todo";

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<TodoProps | null>(null);

  const handleTaskClick = (task: TodoProps) => {
    setSelectedTask(task);
  };

  return (
    <main className="flex min-h-screen w-full">
      <div className="flex h-full w-3/4 flex-col items-center gap-5 bg-white p-20 text-black">
        <AddTodo />
        <Section>All Task</Section>
        <TodoList onTaskClick={() => handleTaskClick} />
      </div>

      <div className="w-1/5 py-20 text-black">
        <TodoContent selectedTask={selectedTask} />
      </div>
    </main>
  );
}
