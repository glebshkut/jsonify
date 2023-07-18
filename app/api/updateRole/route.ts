import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const body = await req.json();

  console.log('req.body', body)
  const { email, role } = body;

  if (!email || !role) {
    return NextResponse.json({ message: "Empty body being passed to the server" }, { status: 422 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { role },
    });

    return new Response(JSON.stringify({ user: updatedUser }));

  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
