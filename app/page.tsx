"use client"

import { getUserRole } from "@/components/selectors/getUserRole";
import { useAppDispatch, useAppSelector } from '@/components/store/hooks';
import { userActions } from "@/components/store/userSlice";
import { User } from "@/lib/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const { data: session } = useSession();
  const role = useAppSelector(getUserRole)
  const dispatch = useAppDispatch();
  const { setAuthData } = userActions;

  useEffect(() => {
    const getUserInfo = (email: User["email"]) => {
      axios.post("/api/getUser", {
        email: email,
      })
        .then((res) => {
          dispatch(setAuthData(res.data.user));
        })
    };

    if (session?.user?.email) {
      getUserInfo(session?.user?.email);
    }
  }, [dispatch, session, setAuthData]);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      {!session ?
        <>
          <p className="text-2xl font-bold">Please sign in to access this page</p>
          <button onClick={() => signIn("github")} className="inline-flex items-center gap-2 text-xl text-white bg-blue-500 px-7 py-3 rounded-full hover:bg-inherit hover:text-black hover:border-black hover:shadow-3xl hover:shadow-blue-500 shadow-none ">Log In <BsGithub size="1.5em" /></button>
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