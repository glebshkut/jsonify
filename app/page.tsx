"use client"
import { getUserRole } from "@/components/selectors/getUserRole";
import { useAppSelector } from '@/components/store/hooks';
import { useGetUserInfo } from "@/components/store/hooks/useGetUserInfo";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const role = useAppSelector(getUserRole)
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useGetUserInfo(session, () => {
    setIsLoading(false);
  });


  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      {!session ?
        <>
          <p className="text-2xl font-bold dark:text-white text-slate-700">Please sign in to access this page</p>
          <button onClick={() => signIn("github")} className="inline-flex items-center gap-2 text-xl text-white bg-blue-500 px-7 py-3 rounded-full hover:shadow-3xl dark:text-gray-200 dark:bg-slate-500 hover:shadow-blue-500 dark:hover:shadow-slate-500 shadow-none">Log In <BsGithub size="1.5em" /></button>
        </>
        :
        <>
          <p className="text-xl">Welcome {session.user?.name}!</p>
          {role && <p>Your role is {role}</p>}
        </>
      }
    </div>
  )
}