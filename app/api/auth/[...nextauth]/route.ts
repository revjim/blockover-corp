import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// @ts-expect-error - NextAuth compatibility issue with Next.js 16
export const GET = handler;
// @ts-expect-error - NextAuth compatibility issue with Next.js 16
export const POST = handler;
