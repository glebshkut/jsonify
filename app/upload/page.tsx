"use client";
import "./upload.css";
import { UploadButton } from "@/components/utils/uploadthing";
import { useAppSelector } from "@/components/store/hooks";
import { getUserRole } from "@/components/selectors/getUserRole";
import { redirect } from "next/navigation";
import { AppRoutes, RoutePath } from "@/lib/routes";
import { Role } from "@/lib/types";
import { getUserId } from "@/components/selectors/getUserId";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

interface UploadDataInterface {
  message: string;
  url: string;
}

export default function Home() {
  const [uploadData, setUploadData] = useState<UploadDataInterface>();
  const currentRole = useAppSelector(getUserRole);
  const userId = useAppSelector(getUserId);
  if (currentRole !== Role.ADMIN) {
    redirect(RoutePath[AppRoutes.HOME]);
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-10 p-24 dark:text-white">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          axios.post("/api/imageUploader", {
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
        <h1 className="text-2xl">{uploadData.message}</h1>
        <Link className="px-3 py-1 text-lg underline text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" href={uploadData.url} target="_blank">View Your File</Link>
      </div>}
    </main>
  );
}