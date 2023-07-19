import DocumentsList from './DocumentsList';
import { PrismaClient, UploadedFile } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Documents() {
  const data: UploadedFile[] = await getData();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
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
