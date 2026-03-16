import { db } from "@/db";
import { courses, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect(
        new URL("/courses?payment=failed", req.url)
      );
    }

    // Verify transaction with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const transaction = response.data.data;

    if (transaction.status !== "success") {
      return NextResponse.redirect(
        new URL("/courses?payment=failed", req.url)
      );
    }

    const { courseId, courseTitle, userId } = transaction.metadata;

    // Check if purchase already exists (avoid duplicates)
    const existingPurchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.paystackReference, reference))
      .then((r) => r[0]);

    if (!existingPurchase) {
      // Save purchase to database
      await db.insert(purchases).values({
        userId,
        courseId,
        courseTitle,
        amountPaid: transaction.amount,
        paystackReference: reference,
        completedLessons: [],
      });
    }

    // Redirect to the course page with success message
    return NextResponse.redirect(
      new URL(`/courses/${await getCourseSlug(courseId)}?payment=success`, req.url)
    );
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.redirect(
      new URL("/courses?payment=failed", req.url)
    );
  }
}

async function getCourseSlug(courseId: string): Promise<string> {
  const course = await db
    .select({ slug: courses.slug })
    .from(courses)
    .where(eq(courses.id, courseId))
    .then((r) => r[0]);
  return course?.slug ?? courseId;
}