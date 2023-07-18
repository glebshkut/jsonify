import { signIn, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

export default function MainPage() {
  const { data: session } = useSession();

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
        </>
      }
    </div>
  )
}