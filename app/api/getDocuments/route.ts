import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const files = await prisma.uploadedFile.findMany({
      orderBy: [
        {
          uploadedAt: 'desc',
        },
      ],
    });

    return new Response(JSON.stringify({ files }));

  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}