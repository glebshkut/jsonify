import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const body = await req.json();

  const {
    userId,
    files
  } = body;

  if (!userId || !files) {
    return new Response(JSON.stringify({ message: "Empty body being passed to the server" }), { status: 422 });
  }

  try {
    await prisma.uploadedFile.create({
      data: {
        userId: userId,
        path: files[0].fileUrl,
        filename: files[0].fileKey,
      },
    });

    return new Response(JSON.stringify({ message: "Your file is successfully uploaded!", url: files[0].fileUrl }));

  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
