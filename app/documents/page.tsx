"use client"
import { useSession } from "next-auth/react"
import Documents from "./documents"
import { redirect } from "next/navigation";
import { AppRoutes, RoutePath } from "@/lib/routes";

export default function Page() {
  const { data: session } = useSession();
  if (!session) {
    redirect(RoutePath[AppRoutes.HOME]);
  }
  return (
    <><Documents /></>
  )
}
