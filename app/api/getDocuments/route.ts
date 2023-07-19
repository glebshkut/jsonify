import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}