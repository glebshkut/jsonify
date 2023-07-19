import { authOptions } from "@/lib/auth";
import { Role } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ message: "You are not authenticated" }), { status: 403 });
    }

    const userData = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!userData) {
      return new Response(JSON.stringify({ message: "Database error occured, try again" }), { status: 403 });
    }

    if (userData.role !== Role.ADMIN) {
      return new Response(JSON.stringify({ message: "You are not an admin" }), { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return new Response(JSON.stringify({ users: users }));

  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}