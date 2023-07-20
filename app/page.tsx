"use client"
import { User } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useMemo } from "react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const { data: session, status } = useSession();
  const user = useMemo(() => session?.user as User, [session]);

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      {!session ?
        <>
          <p className="text-2xl font-bold dark:text-white text-slate-700">Please sign in to access this page</p>
          <button onClick={() => signIn("github")} className="inline-flex items-center gap-2 text-xl text-white bg-blue-500 px-7 py-3 rounded-full hover:shadow-3xl dark:text-gray-200 dark:bg-slate-500 hover:shadow-blue-500 dark:hover:shadow-slate-500 shadow-none">Log In <BsGithub size="1.5em" /></button>
        </>
        :
        <>
          <p className="text-xl">Welcome {user?.name}!</p>
          {user && <p>Your role is {user?.role}</p>}
        </>
      }
    </div>
  )
}