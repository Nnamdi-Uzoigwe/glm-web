import { auth } from "@/auth";
import { db } from "@/db";
import { courses, lessons, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin role
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .then((r) => r[0]);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title, slug, description, fullDescription,
      instructor, instructorBio, category, level,
      price, isFree, lessons: lessonData,
    } = body;

    // Insert course
    const [course] = await db
      .insert(courses)
      .values({
        title,
        slug,
        description,
        fullDescription,
        instructor,
        instructorBio,
        category,
        level,
        price: isFree ? 0 : price,
        isFree,
        published: false, // always save as draft first
      })
      .returning();

    // Insert lessons
    if (lessonData && lessonData.length > 0) {
      await db.insert(lessons).values(
        lessonData.map((l: {
          title: string;
          description: string;
          isFreePreview: boolean;
          cloudinaryPublicId: string;
          order: number;
        }) => ({
          courseId: course.id,
          title: l.title,
          description: l.description,
          isFreePreview: l.isFreePreview,
          cloudinaryPublicId: l.cloudinaryPublicId,
          order: l.order,
        }))
      );
    }

    return NextResponse.json({ courseId: course.id, slug: course.slug });
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}