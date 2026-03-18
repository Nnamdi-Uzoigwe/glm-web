import { auth } from "@/auth";
import { db } from "@/db";
import { devotionals, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function isAdmin(userId: string) {
  const user = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).then((r) => r[0]);
  return user?.role === "admin";
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { title, date, scripture, scriptureText, body: message, prayer, author, tags } = body;

  if (!title || !date || !scripture || !scriptureText || !message || !prayer || !author) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  await db.insert(devotionals).values({
    title, date, scripture, scriptureText,
    body: message, prayer, author,
    tags: tags ?? [],
    published: false,
  });

  return NextResponse.json({ success: true });
}