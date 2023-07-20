'use client';
import Skeleton from "@/components/ui/Skeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import seedrandom from 'seedrandom';

export default function ClientPage({
  children,
}: {
  children: ReactNode;
}) {
  const rng = seedrandom('my-seed-value');
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    const skeletonCount = Math.floor(rng() * 10);
    return (
      <div className="p-5 flex flex-col gap-4 max-w-screen-sm">
        <Skeleton width="150px" height="28px" border="5px" />
        <ul className="flex flex-col gap-2">
          {new Array(skeletonCount).fill(null).map((_, key) => {
            const randomWidth = Math.floor(rng() * (80 - 60 + 1)) + 60;
            return (
              <li key={key} className="flex flex-row justify-between">
                <Skeleton width={`${randomWidth}%`} height="24px" border="5px" />
                <Skeleton width="15%" height="24px" />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  );
}