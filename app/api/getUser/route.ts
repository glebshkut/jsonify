import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: "Empty body being passed to the server" }, { status: 422 })
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { email: email },
    });

    return new Response(JSON.stringify({ user: userData }));

  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}