import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";

const prismaClient = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // @ts-ignore
    session: async ({ session }) => {
      if (session.user?.email) {
        const user = await prismaClient.user.findUnique({
          where: {
            email: session.user?.email,
          },
        });
        return {
          ...session,
          user: user
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};