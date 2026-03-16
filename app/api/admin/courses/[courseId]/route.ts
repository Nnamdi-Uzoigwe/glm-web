import { auth } from "@/auth";
import { db } from "@/db";
import { courses, lessons, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function isAdmin(userId: string) {
  const user = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .then((r) => r[0]);
  return user?.role === "admin";
}

// GET /api/admin/courses/[courseId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { courseId } = await params;

  const course = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .then((r) => r[0]);

  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(lessons.order);

  return NextResponse.json({ course, lessons: courseLessons });
}

// PATCH /api/admin/courses/[courseId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { courseId } = await params;
  const body = await req.json();

  const {
    title, slug, description, fullDescription,
    instructor, instructorBio, category, level,
    price, isFree, published, lessons: lessonData,
  } = body;

  // Update course
  await db
    .update(courses)
    .set({
      title, slug, description, fullDescription,
      instructor, instructorBio, category, level,
      price: isFree ? 0 : price,
      isFree, published,
      updatedAt: new Date(),
    })
    .where(eq(courses.id, courseId));

  // Delete existing lessons and re-insert
  await db.delete(lessons).where(eq(lessons.courseId, courseId));

  if (lessonData && lessonData.length > 0) {
    await db.insert(lessons).values(
      lessonData.map((l: {
        title: string;
        description: string;
        isFreePreview: boolean;
        cloudinaryPublicId: string;
        order: number;
      }) => ({
        courseId,
        title: l.title,
        description: l.description,
        isFreePreview: l.isFreePreview,
        cloudinaryPublicId: l.cloudinaryPublicId,
        order: l.order,
      }))
    );
  }

  return NextResponse.json({ success: true });
}