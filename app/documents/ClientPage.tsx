'use client';
import { useGetUserInfo } from "@/components/store/hooks/useGetUserInfo";
import { AppRoutes, RoutePath } from "@/lib/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useState } from "react";
export default function ClientPage({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  if (!isLoading && !session) {
    redirect(RoutePath[AppRoutes.HOME]);
  }

  useGetUserInfo(session, () => {
    setIsLoading(false);
  });

  return (
    <>
      {children}
    </>
  );
}