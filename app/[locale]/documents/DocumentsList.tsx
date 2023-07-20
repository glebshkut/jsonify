'use client';

import { UploadedFile } from "@prisma/client";
import axios from "axios";
import fileDownload from "js-file-download";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  data: UploadedFile[];
}

export default function DocumentsList({ data }: Props) {
  const t = useTranslations("documents");
  const handleDownload = (url: string, filename: string) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const documents = data.map((document: UploadedFile) => (
    <li key={document.id} className="flex flex-row justify-between">
      <Link href={document.path} target="_blank" className="underline text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
        {document.filename}
      </Link>
      <button onClick={() => handleDownload(document.path, document.filename)}>
        {t("download")}
      </button>
    </li>
  ));

  return (
    <div className="p-5 flex flex-col gap-4 max-w-screen-sm">
      <h1 className="text-xl font-bold">{t("uploadedFiles")}</h1>
      <ul className="flex flex-col gap-2">
        {documents}
      </ul>
    </div>
  );
}
