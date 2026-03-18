"use server";

import { db } from "@/db";
import { devotionals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleDevotionalPublished(id: string, current: boolean) {
  await db
    .update(devotionals)
    .set({ published: !current })
    .where(eq(devotionals.id, id));
  revalidatePath("/admin/devotionals");
  revalidatePath("/ministry/devotionals");
}

export async function deleteDevotional(id: string) {
  await db.delete(devotionals).where(eq(devotionals.id, id));
  revalidatePath("/admin/devotionals");
  redirect("/admin/devotionals");
}