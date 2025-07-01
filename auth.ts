import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma'; 

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [Google, Resend],
    adapter: PrismaAdapter(prisma)
})
