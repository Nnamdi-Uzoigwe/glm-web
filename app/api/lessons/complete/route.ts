import { auth } from "@/auth";
import { db } from "@/db";
import { purchases, lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID required" }, { status: 400 });
    }

    // Get the lesson to find its courseId
    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId))
      .then((r) => r[0]);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Find the user's purchase for this course
    const purchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, session.user.id))
      .then((rows) => rows.find((p) => p.courseId === lesson.courseId));

    if (!purchase) {
      return NextResponse.json({ error: "Course not purchased" }, { status: 403 });
    }

    // Add lessonId to completedLessons if not already there
    const already = purchase.completedLessons?.includes(lessonId);
    if (already) {
      return NextResponse.json({ success: true, alreadyCompleted: true });
    }

    const updated = [...(purchase.completedLessons ?? []), lessonId];

    await db
      .update(purchases)
      .set({ completedLessons: updated })
      .where(eq(purchases.id, purchase.id));

    return NextResponse.json({ success: true, completedLessons: updated });
  } catch (error) {
    console.error("Mark complete error:", error);
    return NextResponse.json({ error: "Failed to mark lesson complete" }, { status: 500 });
  }
}