"use client";
import Login from "@/app/(login)/login/page";
import Loader from "@/components/Loader";
import ShuttleList from "@/components/ShuttleList";
import TodoContent from "@/components/TodoContent";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/addTodo";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState<boolean>(true);

  //loading
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      setLoading(false);
      console.log("loading");
    };
    checkAuthentication();
  }, [user]);

  return (
    <main className="flex min-h-screen w-full">
      {user ? (
        <>
          <div className="flex h-full w-3/4 flex-col items-center gap-5 bg-white p-20 text-black">
            <p className="w-full pt-5 text-start text-3xl font-black">
              All Shuttles
            </p>
            <ShuttleList />
          </div>

          <div className="w-1/5 py-20 text-black">
            <TodoContent />
          </div>
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}

// {loading ? <Loader /> : user ? <p>weflcome</p> : <p>proctected</p>}
