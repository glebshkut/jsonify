import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from 'next-auth';
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session }) {
      return session
    },
  },
};