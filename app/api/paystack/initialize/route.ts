import { auth } from "@/auth";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Fetch course from database
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .then((r) => r[0]);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (!course.published) {
      return NextResponse.json({ error: "Course is not available" }, { status: 400 });
    }

    // Initialize Paystack transaction
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: session.user.email,
        amount: course.price, // already in kobo
        currency: "NGN",
        reference: `glm_${courseId}_${session.user.id}_${Date.now()}`,
        metadata: {
          courseId: course.id,
          courseTitle: course.title,
          userId: session.user.id,
          userEmail: session.user.email,
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paystack/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      authorizationUrl: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}