"use client";
import Loader from "@/components/Loader";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState<boolean>(true);

  //loading
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      console.log("loading");
    };
    checkAuthentication();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24 text-black ">
      {loading ? <Loader /> : user ? <p>weflcome</p> : <p>proctected</p>}
    </main>
  );
}
