// import { auth } from "@/auth";
// import { db } from "@/db";
// import { lessons, purchases } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ lessonId: string }> }
// ) {
//   try {
//     const { lessonId } = await params;
//     const session = await auth();

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const lesson = await db
//       .select()
//       .from(lessons)
//       .where(eq(lessons.id, lessonId))
//       .then((r) => r[0]);

//     if (!lesson) {
//       return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
//     }

//     if (!lesson.isFreePreview) {
//       const purchase = await db
//         .select()
//         .from(purchases)
//         .where(eq(purchases.userId, session.user.id))
//         .then((rows) => rows.find((p) => p.courseId === lesson.courseId));

//       if (!purchase) {
//         return NextResponse.json(
//           { error: "You have not purchased this course" },
//           { status: 403 }
//         );
//       }
//     }

//     // Build public Cloudinary URL
//     const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
//     const publicId = lesson.cloudinaryPublicId;
//     const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;

//     console.log("Streaming from:", videoUrl);

//     const videoResponse = await fetch(videoUrl);

//     if (!videoResponse.ok) {
//       console.error("Cloudinary error:", videoResponse.status);
//       return NextResponse.json({ error: "Failed to fetch video" }, { status: 502 });
//     }

//     const headers = new Headers();
//     headers.set("Content-Type", "video/mp4");
//     headers.set("Cache-Control", "private, no-store");
//     headers.set("Accept-Ranges", "bytes");

//     const contentLength = videoResponse.headers.get("Content-Length");
//     if (contentLength) headers.set("Content-Length", contentLength);

//     return new NextResponse(videoResponse.body, {
//       status: videoResponse.status,
//       headers,
//     });
//   } catch (error) {
//     console.error("Video proxy error:", error);
//     return NextResponse.json({ error: "Failed to stream video" }, { status: 500 });
//   }
// }

import { auth } from "@/auth";
import { db } from "@/db";
import { lessons, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId))
      .then((r) => r[0]);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (!lesson.isFreePreview) {
      const purchase = await db
        .select()
        .from(purchases)
        .where(eq(purchases.userId, session.user.id))
        .then((rows) => rows.find((p) => p.courseId === lesson.courseId));

      if (!purchase) {
        return NextResponse.json({ error: "Course not purchased" }, { status: 403 });
      }
    }

    // Build the direct Cloudinary URL
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${lesson.cloudinaryPublicId}.mp4`;

    // Return the URL as JSON — client fetches directly from Cloudinary
    return NextResponse.json({ url: videoUrl });

  } catch (error) {
    console.error("Video error:", error);
    return NextResponse.json({ error: "Failed to load video" }, { status: 500 });
  }
}