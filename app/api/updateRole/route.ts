import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const body = await req.json();

  const { email, role } = body;

  if (!email || !role) {
    return new Response(JSON.stringify({ message: "Empty body being passed to the server" }), { status: 422 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { role },
    });

    return new Response(JSON.stringify({ user: updatedUser }));

  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
