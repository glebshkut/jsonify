"use client"
import ThemeSwitcher from "@/components/helpers/ThemeSwitcher";
import Icon from "@/components/ui/Icon";
import { routes } from "@/lib/routes";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useMemo, useState } from "react";
import { BiExit } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import RoleModal from "./RoleModal";

export default function NavBar() {
  const { data: session } = useSession();
  const user = useMemo(() => session?.user as User, [session]);
  const role = useMemo(() => user?.role, [user]);
  const [roleModal, setRoleModalOpen] = useState(false);

  const handleRoleClick = () => {
    setRoleModalOpen(true);
  }

  const headerLinks = Object.entries(routes).map(([page, value]) => (
    session && role && (!value.role || role === value.role) && (
      <Link href={value.path} key={page} className="text-white hover:text-yellow-200 dark:text-slate-400 dark:hover:text-yellow-400 hover:cursor-pointer hover:underline">
        {page}
      </Link>
    )
  ));

  return (
    <div className="bg-blue-500 dark:bg-blue-800 flex flex-row justify-between items-center px-5" style={{ height: "var(--navbar-height)" }}>
      <div className="flex flex-row items-center gap-5 text-white">
        {headerLinks}
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <ThemeSwitcher />
        {session ?
          <>
            <Icon Icon={CgProfile} onClick={handleRoleClick} />
            <Icon Icon={BiExit} onClick={signOut} />
            {roleModal && <RoleModal setRoleModalOpen={setRoleModalOpen} />}
          </>
          :
          <>
            <Icon Icon={BsGithub} onClick={() => signIn("github")} />
          </>
        }
      </div>
    </div>
  );
}
