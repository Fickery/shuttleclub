"use client";
import Loading from "@/app/loading";
import TodoContent from "@/components/TodoContent";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import { UserAuth } from "@/context/AuthContext";
import { SetStateAction, Suspense, useEffect, useState } from "react";

export default function Tasks() {
  const { user } = UserAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  // //isSession
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // });

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const handleTaskClick = (task: SetStateAction<null>) => {
    setSelectedTask(task);
  };

  return (
    <main className="flex min-h-screen w-full">
      {user ? (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      ) : (
        <Loading />
      )}
    </main>
  );
}

// Tasks.requireAuth = true;
