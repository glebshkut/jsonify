import React from 'react'
import { IconType } from "react-icons";

interface IconProps {
  Icon: IconType;
  size?: string;
  onClick?: () => void;
  className?: string;
}

export default function Icon(props: IconProps) {
  const {
    Icon,
    size = "2em",
    onClick,
    className
  } = props;

  return (
    <div onClick={onClick} className={`text-white hover:text-yellow-200 dark:text-slate-400 dark:hover:text-yellow-400 hover:cursor-pointer ${className}`}><Icon size={size} /></div>
  )
}
