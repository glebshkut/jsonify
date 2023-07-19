import { UploadedFile } from "@/lib/types";
import axios from "axios";
import fileDownload from "js-file-download";

export default async function Documents() {
  const data = await getData();

  const handleDownload = (url: string, filename: string) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <ul>
        {data.map((document: UploadedFile) => (
          <li key={document.id}>
            <a href={document.path} className="text-blue-500 underline">
              {document.filename}
            </a>
            <button onClick={() => handleDownload(document.path, document.filename)}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/getDocuments");

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  };

  const { files } = await res.json();

  if (!files) {
    throw new Error('Failed to receive files')
  }

  return files;
}