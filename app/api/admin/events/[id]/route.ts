import { auth } from "@/auth";
import { db } from "@/db";
import { events, users } from "@/db/schema";
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
  const event = await db.select().from(events).where(eq(events.id, id)).then((r) => r[0]);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
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
  const { title, category, date, time, location, isOnline, address, description, fullDescription, host, capacity, isFree, featured, published } = body;

  await db.update(events).set({
    title, category, date, time, location,
    isOnline: !!isOnline,
    address: address || null,
    description,
    fullDescription: fullDescription || null,
    host, capacity,
    isFree: !!isFree,
    featured: !!featured,
    published: !!published,
  }).where(eq(events.id, id));

  return NextResponse.json({ success: true });
}