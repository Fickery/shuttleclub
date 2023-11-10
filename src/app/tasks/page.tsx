import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import Auth from "@/components/auth";

export default function Page() {
  return (
    <main className="flex min-h-screen bg-white text-black ">
      <AddTodo />
      <TodoList />
    </main>
  );
}
