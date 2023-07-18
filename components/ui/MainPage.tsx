import { User } from "@/lib/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const { data: session } = useSession();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserInfo = (email: User["email"]) => {
      axios.post("/api/getUser", {
        email: email,
      })
        .then((res) => {
          console.log(`User received`, res.data.user)
          setUser(res.data.user);
        })
    };

    if (session?.user?.email) {
      getUserInfo(session?.user?.email);
    }
  }, [session]);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5" style={{ height: "calc(100vh - var(--navbar-height))" }}>
      {!session ?
        <>
          <p className="text-2xl font-bold">Please sign in to access this page</p>
          <button onClick={() => signIn("github")} className="inline-flex items-center gap-2 text-xl text-white bg-blue-500 px-7 py-3 rounded-full hover:bg-inherit hover:text-black hover:border-black hover:shadow-3xl hover:shadow-blue-500 shadow-none ">Log In <BsGithub size="1.5em" /></button>
        </>
        :
        <>
          <p className="text-xl">Welcome {session.user?.name}!</p>
          {user && <p>Your role is {user.role}</p>}
        </>
      }
    </div>
  )
}