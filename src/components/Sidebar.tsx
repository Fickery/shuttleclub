"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const [divHidden, setDivHidden] = useState<boolean>(true);
  const [droplistMekhebi, setDroplistMekhebi] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  //user auth
  const { user, googleSignIn, logOut } = UserAuth();

  // show profile setting
  const changeCurrntAction = () => {
    setDivHidden((prevIsActive) => !prevIsActive);
  };

  // action for show droplist of overView
  const ShowDropList = () => {
    setDroplistMekhebi((prevIsActive) => !prevIsActive);
  };

  return (
    <>
      {user ? (
        <aside
          id="logo-sidebar"
          className="h-screen bg-white pt-20 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-white px-3 pb-4">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/shuttles"
                  className="group flex items-center p-2 text-black hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    All Shuttles
                  </span>
                  <span className="font-regular ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-gray-100 p-3 text-xs text-black">
                    3
                  </span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between p-2 text-base text-black transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-200"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <Link href="/tasks" onClick={ShowDropList}>
                    <span className="ml-3 flex-1 whitespace-nowrap text-left">
                      Tasks
                    </span>
                  </Link>
                  <div
                    onClick={ShowDropList}
                    className="flex w-fit justify-end rounded-full p-1 pr-0 text-[grey] hover:bg-white"
                  >
                    <svg
                      className="mr-1 h-3 w-3 rounded-full "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    droplistMekhebi ? "hidden" : ""
                  } space-y-2 py-2`}
                >
                  <li>
                    <Link
                      href="#"
                      className="group flex w-full items-center p-2 pl-6 text-black transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-200"
                    >
                      <span className="flex-1 whitespace-nowrap pl-3">
                        Outgoing
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="group flex w-full items-center p-2 pl-6 text-black transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-200"
                    >
                      <span className="flex-1 whitespace-nowrap pl-3">
                        Upcoming
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      ) : (
        <div className="h-full w-full bg-slate-300">
          <p>Please LOGIN</p>
        </div>
      )}
    </>
  );
}
