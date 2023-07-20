"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Icon from "@/components/ui/Icon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "dark" ?
        <button onClick={() => setTheme("light")}><Icon Icon={MdLightMode} className="animate-pulse" /></button>
        :
        <button onClick={() => setTheme("dark")}><Icon Icon={MdDarkMode} className="animate-pulse" /></button>
      }
    </>
  );
};

export default ThemeSwitcher;