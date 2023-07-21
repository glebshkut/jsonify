import { useLocale } from "next-intl"
import Link from "next/link"
import { JSX, useRef, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useOnClickOutside } from 'usehooks-ts'
import { Portal } from "../helpers/Portal"
import Icon from "./Icon"

interface MobileNavBarProps {
  iconsList: (
    className: string,
  ) => JSX.Element;
}

export default function MobileNavBar({ iconsList }: MobileNavBarProps) {
  const locale = useLocale();
  const [open, setOpen] = useState(false)
  const mobileRef = useRef(null);

  useOnClickOutside(mobileRef, () => setOpen(false));
  return (
    <div className="sm:hidden w-full flex flex-row justify-between items-center">
      <Link className="text-2xl font-bold text-white dark:text-slate-400" href={locale === "es" ? "/es" : "/"}>JSONIFY</Link>
      <Icon Icon={GiHamburgerMenu} onClick={() => setOpen(!open)} className="z-30" />
      {open &&
        <Portal>
          <div onClick={() => setOpen(false)} ref={mobileRef} className="absolute top-0 gap-5 right-0 h-[100dvh] flex flex-col items-center justify-center bg-blue-500 dark:bg-blue-800" style={{ width: "var(--navbar-height)" }}>
            {iconsList("bg-blue-500 dark:bg-blue-800 flex flex-col items-center justify-center gap-5")}
          </div>
        </Portal>
      }
    </div>
  )
}
