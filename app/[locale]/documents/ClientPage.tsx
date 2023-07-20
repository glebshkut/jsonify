'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
export default function ClientPage({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <>
      {children}
    </>
  );
}