"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import RoleModal from "./RoleModal";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { useAppSelector } from "@/components/store/hooks";
import { getUserRole } from "@/components/selectors/getUserRole";

export default function NavBar() {
  const { data: session } = useSession();
  const [roleModal, setRoleModalOpen] = useState(false);
  const role = useAppSelector(getUserRole)

  const handleRoleClick = () => {
    setRoleModalOpen(true);
  }

  const headerLinks = Object.entries(routes).map(([page, value]) => (
    session && role && (!value.role || role === value.role) && (
      <Link href={value.path} key={page} className="hover:underline">
        {page}
      </Link>
    )
  ));


  return (
    <div className="bg-blue-500 flex flex-row justify-between items-center px-5" style={{ height: "var(--navbar-height)" }}>
      <div className="flex flex-row items-center gap-5 text-white">
        {headerLinks}
      </div>
      <div className="flex flex-col items-end justify-around">
        {session ?
          <div className="flex flex-row justify-center gap-3">
            <button onClick={handleRoleClick} className="text-white hover:text-stone-200"><CgProfile size="2em" /></button>
            <button onClick={() => signOut()} className="text-white hover:text-stone-200"><BiExit size="2em" /></button>
            {roleModal && <RoleModal setRoleModalOpen={setRoleModalOpen} />}
          </div>
          :
          <>
            <button onClick={() => signIn("github")} className="text-xl text-white hover:text-stone-200"><BsGithub size="1.5em" /></button>
          </>
        }
      </div>
    </div>
  );
}
