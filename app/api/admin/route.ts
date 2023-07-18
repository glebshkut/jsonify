import { authOptions } from "@/lib/auth";
import { Role } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('session 😄', session)

    if (!session?.user) {
      return new Response(JSON.stringify({ message: "You are not authenticated" }), { status: 403 });
    }

    window.location.host
    const response = await fetch(`http://localhost:3000/api/getUser`, {
      method: "POST",
      body: JSON.stringify({ email: session.user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("data.user.role", data);
    if (data.user.role !== Role.ADMIN) {
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