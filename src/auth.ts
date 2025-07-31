import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from './lib/prisma';
import authConfig from './auth.config';
import { getUserById } from './data-query/user';
import { getAccountByUserId } from './data-query/account';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  trustHost: true,
  events: {
    async linkAccount({ user }) {
      console.log("linkAccount user ",user);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
 
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      if (!user.id) {
        return false; // Reject sign-in if user ID is undefined
      }

      const existingUser = await getUserById(user.id);
   
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      // console.log("token ",token);
      
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
    async session({ session, token }) {
      // console.log("session session",session);
      // console.log("session token",token);
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name ?? '';
        session.user.email = token.email ?? '';
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
