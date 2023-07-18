import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import RoleModal from "./RoleModal";

export default function NavBar() {
  const { data: session } = useSession();
  const [roleModal, setRoleModalOpen] = useState(false);


  const handleRoleClick = () => {
    setRoleModalOpen(true);
  }

  console.log("session", session?.user)


  return (
    <div className="bg-blue-500 flex flex-col items-end justify-around pr-5" style={{ height: "var(--navbar-height)" }}>
      {session ?
        <div className="flex flex-row justify-center gap-3">
          <button onClick={handleRoleClick} className="text-white hover:text-stone-200"><CgProfile size="2em" /></button>
          <button onClick={() => signOut()} className="text-white hover:text-stone-200"><BiExit size="2em" /></button>
          {roleModal && <RoleModal />}
        </div>
        :
        <>
          <button onClick={() => signIn("github")} className="text-xl text-white hover:text-stone-200"><BsGithub size="1.5em" /></button>
        </>
      }
    </div>
  );
}
