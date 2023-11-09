import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5 bg-white p-20 text-black">
      <AddTodo />
      <TodoList />
    </main>
  );
}
