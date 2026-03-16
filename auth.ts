import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    // ── Google OAuth ──────────────────────────────────────────────────────────
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // ── Email + Password ──────────────────────────────────────────────────────
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .then((rows) => rows[0]);

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    // Attach user id to the JWT token
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    // // Attach user id to the session so we can access it in components
    // async session({ session, token }) {
    //   if (token && session.user) {
    //     session.user.id = token.id as string;
    //   }
    //   return session;
    // },

    async jwt({ token, user }) {
  if (user && user.id) {
    token.id = user.id;
    const dbUser = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, user.id))
      .then((r) => r[0]);
    token.role = dbUser?.role;
  }
  return token;
},
async session({ session, token }) {
  if (token && session.user) {
    session.user.id = token.id as string;
    session.user.role = token.role as string;
  }
  return session;
},
  },
});