"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [divHidden, setDivHidden] = useState<boolean>(true);
  const [droplistMekhebi, setDroplistMekhebi] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  //user auth
  const {
    user,
    googleSignIn,
    logOut,
    githubSignIn,
    SignUpAdmin,
    SignUpNonAdmin,
    loginUser,
    registerUser,
  } = UserAuth();
  // console.log(user);

  //sign in / sign out
  const handleSignIn = async (e: Event) => {
    e.preventDefault();
    setDivHidden(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async (e: Event) => {
    e.preventDefault();
    setDivHidden(true);
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  //loading
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      console.log("loading");
    };
    checkAuthentication();
  }, [user]);

  // show profile setting
  const changeCurrntAction = () => {
    setDivHidden((prevIsActive) => !prevIsActive);
  };

  // action for show droplist of overView
  const ShowDropList = () => {
    setDroplistMekhebi((prevIsActive) => !prevIsActive);
  };

  // router
  const router = usePathname();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="/home" className="ml-2 flex md:mr-24">
                <span className="self-center whitespace-nowrap text-xl font-black lowercase tracking-tighter text-black sm:text-2xl">
                  ShuttleClub
                </span>
                <span className="ml-1 self-center whitespace-nowrap text-xs font-normal text-gray-400 sm:text-[1rem] sm:leading-8">
                  admin
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={changeCurrntAction}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user && user.photoURL ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.photoURL}
                        alt="user photo"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {loading ? (
        <p>...loading</p>
      ) : user ? (
        <div
          className={`z-50 my-4 ${
            divHidden ? "hidden" : ""
          } h-58 absolute right-2 top-11 w-64 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
          id="dropdown-user"
        >
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-gray-900 dark:text-white" role="none">
              {user.displayName}
            </p>
            <p
              className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
              role="none"
            >
              {user.email}
            </p>
          </div>
          <ul className="py-1" role="none">
            <li>
              <Link
                href="/home"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                onClick={() => handleSignOut}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={`z-50 my-4 ${
            divHidden ? "hidden" : ""
          } h-58 absolute right-2 top-11 w-64 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
          id="dropdown-no-user"
        >
          <ul className="py-1" role="none">
            <li>
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                // onClick={handleSignIn}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                onClick={() => handleSignIn}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/*----------------------  sidebar --------------------------*/}
      <aside
        id="logo-sidebar"
        className="h-screen -translate-x-full bg-white pt-20 transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/shuttles"
                className={`group flex items-center p-2 text-black hover:bg-gray-100 dark:hover:bg-gray-200 ${
                  router === "/shuttles" ? "text-blue" : ""
                }`}
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
                  <span
                    className={`ml-3 flex-1 whitespace-nowrap text-left ${
                      router === "/tasks" ? "text-blue" : ""
                    }`}
                  >
                    All Tasks
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
                className={`${droplistMekhebi ? "hidden" : ""} space-y-2 py-2`}
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
    </>
  );
}
