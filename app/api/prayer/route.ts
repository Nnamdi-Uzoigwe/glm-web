import { db } from "@/db";
import { prayerRequests } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, category, request, isAnonymous } = await req.json();

    if (!category || !request) {
      return NextResponse.json({ error: "Category and request are required" }, { status: 400 });
    }

    if (request.trim().length < 10) {
      return NextResponse.json({ error: "Request is too short" }, { status: 400 });
    }

    await db.insert(prayerRequests).values({
      name: isAnonymous ? "Anonymous" : (name?.trim() || "Anonymous"),
      category,
      request: request.trim(),
      isAnonymous: !!isAnonymous,
      prayerCount: 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Prayer request error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await db
      .select()
      .from(prayerRequests)
      .orderBy(prayerRequests.createdAt);

    const masked = requests.map((r) => ({
      ...r,
      name: r.isAnonymous ? "Anonymous" : r.name,
    }));

    return NextResponse.json(masked);
  } catch (error) {
    console.error("Fetch prayer requests error:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}