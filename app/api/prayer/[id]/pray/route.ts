import { db } from "@/db";
import { prayerRequests } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db
      .update(prayerRequests)
      .set({ prayerCount: sql`${prayerRequests.prayerCount} + 1` })
      .where(eq(prayerRequests.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Prayer count error:", error);
    return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
  }
}