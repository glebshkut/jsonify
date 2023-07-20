import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ message: "Empty body being passed to the server" }), { status: 422 });
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { email: email },
    });

    return new Response(JSON.stringify({ user: userData }));

  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}