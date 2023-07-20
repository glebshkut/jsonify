import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const recentFiles = await prisma.uploadedFile.findMany({
      take: 3,
      orderBy: [
        {
          uploadedAt: 'desc',
        },
      ],
    });

    return new Response(JSON.stringify({ files: recentFiles }));

  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}