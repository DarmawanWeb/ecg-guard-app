import NextAuth, { DefaultSession } from "next-auth";
import { User as AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: Role; 
  }

  interface JWT {
    role: Role; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role; 
  }
}
