'use client';
import { AppRoutes, RoutePath } from "@/lib/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
export default function ClientPage({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();
  if (!session) {
    redirect(RoutePath[AppRoutes.HOME]);
  }
  return (
    <>
      {children}
    </>
  );
}