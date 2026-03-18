import { auth } from "@/auth";
import { db } from "@/db";
import { events, users } from "@/db/schema";
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
  const { title, category, date, time, location, isOnline, address, description, fullDescription, host, capacity, isFree, featured } = body;

  if (!title || !category || !date || !time || !location || !host) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  await db.insert(events).values({
    title, category, date, time, location,
    isOnline: !!isOnline,
    address: address || null,
    description,
    fullDescription: fullDescription || null,
    host, capacity,
    isFree: !!isFree,
    featured: !!featured,
    published: false,
  });

  return NextResponse.json({ success: true });
}