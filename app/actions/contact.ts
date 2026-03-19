"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: string) {
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
}