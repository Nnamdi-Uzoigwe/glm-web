import { db } from "@/db";
import { eventRsvps, events } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check event exists
    const event = await db.select().from(events).where(eq(events.id, id)).then((r) => r[0]);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Check capacity
    const rsvpCount = await db
      .select({ count: count() })
      .from(eventRsvps)
      .where(eq(eventRsvps.eventId, id))
      .then((r) => r[0].count);

    if (rsvpCount >= event.capacity) {
      return NextResponse.json({ error: "This event is fully booked" }, { status: 400 });
    }

    // Check duplicate
    const existing = await db
      .select()
      .from(eventRsvps)
      .where(eq(eventRsvps.eventId, id))
      .then((rows) => rows.find((r) => r.email === email));

    if (existing) {
      return NextResponse.json({ error: "You have already registered for this event" }, { status: 400 });
    }

    await db.insert(eventRsvps).values({ eventId: id, name, email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}