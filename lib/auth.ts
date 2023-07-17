import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prismadb";
import { Adapter } from "next-auth/adapters";


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
    session({ session, token, user }) {
      return session
    },
    // async signIn(user, account, profile) {
    //   // Create or update the user record in the database
    //   await prisma.user.upsert({
    //     where: { email: user.email },
    //     update: {},
    //     create: {
    //       email: user.email,
    //       role: 'PARTICIPANT',
    //     },
    //   });
    //   return true;
    // },
  },
};