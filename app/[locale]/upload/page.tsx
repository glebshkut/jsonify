"use client";
import { UploadButton } from "@/components/utils/uploadthing";
import { AppRoutes, RoutePath } from "@/lib/routes";
import { Role } from "@/lib/types";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "./upload.css";
import { useTranslations } from "next-intl";
import Skeleton from "@/components/ui/Skeleton";

interface UploadDataInterface {
  message: string;
  url: string;
}

export default function UploadPage() {
  const [uploadData, setUploadData] = useState<UploadDataInterface>();
  const t = useTranslations("upload");
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const user = useMemo(() => session?.user as User, [session]);
  const userId = useMemo(() => user?.id, [user]);

  useEffect(() => {
    if (status === "authenticated") {
      const user = session.user as User;
      if (user.role !== Role.ADMIN) {
        redirect(RoutePath[AppRoutes.HOME]);
      }
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-1">
        <Skeleton width="144px" height="40px" border="0.375rem" />
        <Skeleton width="93px" height="20px" border="3px" />
      </main>
    )
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-10 p-24 dark:text-white">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          axios.post("/api/fileUploader", {
            userId,
            files: res,
          })
            .then((res) => {
              setUploadData(res.data)
            });
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
      {uploadData && <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl text-center">{t("fileUploadedMessage")}</h1>
        <Link className="px-3 py-1 text-lg underline text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" href={uploadData.url} target="_blank">{t("viewFileMessage")}</Link>
      </div>}
    </main>
  );
}