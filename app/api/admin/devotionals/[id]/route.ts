import { auth } from "@/auth";
import { db } from "@/db";
import { devotionals, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function isAdmin(userId: string) {
  const user = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).then((r) => r[0]);
  return user?.role === "admin";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const devotional = await db.select().from(devotionals).where(eq(devotionals.id, id)).then((r) => r[0]);
  if (!devotional) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(devotional);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const { title, date, scripture, scriptureText, body: message, prayer, author, tags, published } = body;

  await db.update(devotionals).set({
    title, date, scripture, scriptureText,
    body: message, prayer, author,
    tags: tags ?? [],
    published,
  }).where(eq(devotionals.id, id));

  return NextResponse.json({ success: true });
}