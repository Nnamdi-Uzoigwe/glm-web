"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  // Check if email already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((r) => r[0]);

  if (existing) {
    return { error: "An account with this email already exists." };
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  // Auto sign in after registration
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/account",
  });
}


export async function credentialsSignIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Check role before signing in so we can redirect correctly
  const user = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.email, email))
    .then((r) => r[0]);

  const redirectTo = user?.role === "admin" ? "/admin" : "/account";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}