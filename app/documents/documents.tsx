import DocumentsList from './DocumentsList';
import { PrismaClient, UploadedFile } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Documents() {
  const data: UploadedFile[] = await getData();

  return (
    <div className="p-5 flex flex-col gap-4 max-w-screen-sm">
      <h1 className="text-xl font-bold">Uploaded files</h1>
      <DocumentsList data={data} />
    </div>
  );
}

async function getData() {
  const files = await prisma.uploadedFile.findMany({
    orderBy: [
      {
        uploadedAt: 'desc',
      },
    ],
  });

  if (!files) {
    throw new Error('Failed to receive files')
  }

  return files;
}
