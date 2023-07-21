"use client"
import Icon from "@/components/ui/Icon";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import RoleModal from "@/components/ui/RoleModal";
import Skeleton from "@/components/ui/Skeleton";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { routes } from "@/lib/routes";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BiExit } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavBar from "./MobileNavBar";

export default function NavBar() {
  const { data: session, status } = useSession();
  const user = useMemo(() => session?.user as User, [session]);
  const role = useMemo(() => user?.role, [user]);
  const [roleModal, setRoleModalOpen] = useState(false);
  const t = useTranslations("navbar");
  const locale = useLocale();

  const handleRoleClick = () => {
    setRoleModalOpen(true);
  }

  const headerLinks = Object.entries(routes).map(([page, value]) => (
    role && (!value.role || role === value.role) && (
      <Link href={(locale !== "en" ? `/${locale}` : "") + value.path} key={page} className="text-white hover:text-yellow-200 dark:text-slate-400 dark:hover:text-yellow-400 hover:cursor-pointer hover:underline">
        <div className="hidden sm:flex">
          {t(page)}
        </div>
        <div className="sm:hidden">
          <Icon Icon={value.icon} />
        </div>
      </Link>)
  ));

  if (status === "loading") {
    return (
      <div className="flex bg-blue-500 dark:bg-blue-800 flex-row justify-between items-center px-5" style={{ height: "var(--navbar-height)" }}>
        <div className="hidden sm:flex flex-row items-center gap-5 text-white">
          <Skeleton width="50px" height="20px" border="5px" />
          <Skeleton width="60px" height="20px" border="5px" />
          <Skeleton width="90px" height="20px" border="5px" />
        </div>
        <div className="hidden sm:flex flex-row items-center justify-center gap-5">
          <Skeleton width="32px" height="32px" />
          <Skeleton width="32px" height="32px" />
          <Skeleton width="32px" height="32px" />
          <Skeleton width="32px" height="32px" />
        </div>
        <div className="sm:hidden w-full flex flex-row justify-between items-center">
          <p className="text-2xl font-bold text-white pointer-events-none dark:text-slate-400">JSONIFY</p>
          <Icon Icon={GiHamburgerMenu} />
        </div>
      </div>
    )
  };

  const iconsList = (className: string) => {
    return (
      <>
        <div className={className}>
          {headerLinks}
        </div>
        <div className={className}>
          <ThemeSwitcher />
          <LocaleSwitcher />
          {session ?
            <>
              <Icon Icon={CgProfile} onClick={handleRoleClick} />
              <Icon Icon={BiExit} onClick={signOut} />
            </>
            :
            <>
              <Icon Icon={BsGithub} onClick={() => signIn("github")} />
            </>
          }
        </div>
      </>
    )
  }

  return (
    <div className="flex bg-blue-500 dark:bg-blue-800 flex-row justify-between items-center px-5" style={{ height: "var(--navbar-height)" }}>
      {iconsList("hidden sm:flex flex-row items-center justify-center gap-5")}
      {roleModal && <RoleModal setRoleModalOpen={setRoleModalOpen} />}
      <MobileNavBar iconsList={iconsList} />
    </div>
  );
}
