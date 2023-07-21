"use client"
import Skeleton from "@/components/ui/Skeleton";
import { User } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const { data: session, status } = useSession();
  const user = useMemo(() => session?.user as User, [session]);
  const t = useTranslations('home');
  const tRole = useTranslations('role');

  if (status === "loading") {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-5">
        <Skeleton width="300px" height="40px" border="10px" />
        <Skeleton width="200px" height="30px" border="10px" />
      </div>
    )
  }


  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      {!session ?
        <>
          <p className="text-2xl text-center font-bold dark:text-white text-slate-700">{t("pleaseSignIn")}</p>
          <button onClick={() => signIn("github")} className="inline-flex items-center gap-2 text-xl text-white bg-blue-500 px-7 py-3 rounded-full hover:shadow-3xl dark:text-gray-200 dark:bg-slate-500 hover:shadow-blue-500 dark:hover:shadow-slate-500 shadow-none">{t("logIn")} <BsGithub size="1.5em" /></button>
        </>
        :
        <>
          <p className="text-xl">{t("welcome")} {user?.name}!</p>
          {user && <p>{t("yourRoleIs")} {tRole(user?.role)}</p>}
        </>
      }
    </div>
  )
}