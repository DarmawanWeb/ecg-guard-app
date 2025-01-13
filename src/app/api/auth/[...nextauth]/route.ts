import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role; 
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma), 
});

export { handler as GET, handler as POST };
