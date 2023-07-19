'use client';

import { UploadedFile } from "@/lib/types";
import axios from "axios";
import fileDownload from "js-file-download";

interface Props {
  data: UploadedFile[];
}

export default function DocumentsList({ data }: Props) {
  const handleDownload = (url: string, filename: string) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  const documents = data.map((document: UploadedFile) => (
    <li key={document.id} className="flex flex-row gap-3">
      <a href={document.path} className="text-blue-500 underline">
        {document.filename}
      </a>
      <button onClick={() => handleDownload(document.path, document.filename)}>
        Download
      </button>
    </li>
  ));

  return (
    <ul>
      {documents}
    </ul>
  );
}
