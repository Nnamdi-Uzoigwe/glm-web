"use server";

import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleCoursePublished(courseId: string, currentState: boolean) {
  await db
    .update(courses)
    .set({ published: !currentState })
    .where(eq(courses.id, courseId));
  revalidatePath("/admin/courses");
}

export async function deleteCourse(courseId: string) {
  await db.delete(courses).where(eq(courses.id, courseId));
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}