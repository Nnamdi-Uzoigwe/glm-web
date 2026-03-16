// import { auth } from "@/auth";
// import { db } from "@/db";
// import { lessons, purchases } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

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

//     // Fetch the lesson
//     const lesson = await db
//       .select()
//       .from(lessons)
//       .where(eq(lessons.id, lessonId))
//       .then((r) => r[0]);

//     if (!lesson) {
//       return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
//     }

//     // Allow free preview lessons without purchase check
//     if (!lesson.isFreePreview) {
//       // Check user has purchased this course
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

//     // Generate a short-lived signed URL (expires in 1 hour)
//     const signedUrl = cloudinary.utils.private_download_url(
//       lesson.cloudinaryPublicId,
//       "mp4",
//       {
//         resource_type: "video",
//         expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
//         attachment: false,
//       }
//     );

//     // Proxy the video stream from Cloudinary to the browser
//     const videoResponse = await fetch(signedUrl);

//     if (!videoResponse.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch video" },
//         { status: 502 }
//       );
//     }

//     // Forward the video stream with appropriate headers
//     const headers = new Headers();
//     headers.set("Content-Type", "video/mp4");
//     headers.set("Cache-Control", "private, no-store");
//     headers.set("Accept-Ranges", "bytes");

//     const contentLength = videoResponse.headers.get("Content-Length");
//     if (contentLength) headers.set("Content-Length", contentLength);

//     const contentRange = videoResponse.headers.get("Content-Range");
//     if (contentRange) headers.set("Content-Range", contentRange);

//     return new NextResponse(videoResponse.body, {
//       status: videoResponse.status,
//       headers,
//     });
//   } catch (error) {
//     console.error("Video proxy error:", error);
//     return NextResponse.json(
//       { error: "Failed to stream video" },
//       { status: 500 }
//     );
//   }
// }



// import { auth } from "@/auth";
// import { db } from "@/db";
// import { lessons, purchases } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

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

//     // Fetch the lesson
//     const lesson = await db
//       .select()
//       .from(lessons)
//       .where(eq(lessons.id, lessonId))
//       .then((r) => r[0]);

//     if (!lesson) {
//       return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
//     }

//     // Allow free preview lessons without purchase check
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

//     // Generate signed URL using Cloudinary SDK
//     const expiresAt = Math.floor(Date.now() / 1000) + 3600;

//     const signedUrl = cloudinary.url(lesson.cloudinaryPublicId, {
//       resource_type: "video",
//       type: "authenticated",
//       sign_url: true,
//       expires_at: expiresAt,
//       format: "mp4",
//     });

//     console.log("Fetching video from Cloudinary:", signedUrl);

//     // Proxy the video stream
//     const videoResponse = await fetch(signedUrl);

//     if (!videoResponse.ok) {
//       console.error("Cloudinary fetch failed:", videoResponse.status, await videoResponse.text());
//       return NextResponse.json(
//         { error: "Failed to fetch video from storage" },
//         { status: 502 }
//       );
//     }

//     const headers = new Headers();
//     headers.set("Content-Type", "video/mp4");
//     headers.set("Cache-Control", "private, no-store");
//     headers.set("Accept-Ranges", "bytes");

//     const contentLength = videoResponse.headers.get("Content-Length");
//     if (contentLength) headers.set("Content-Length", contentLength);

//     const contentRange = videoResponse.headers.get("Content-Range");
//     if (contentRange) headers.set("Content-Range", contentRange);

//     return new NextResponse(videoResponse.body, {
//       status: videoResponse.status,
//       headers,
//     });
//   } catch (error) {
//     console.error("Video proxy error:", error);
//     return NextResponse.json(
//       { error: "Failed to stream video" },
//       { status: 500 }
//     );
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
        return NextResponse.json(
          { error: "You have not purchased this course" },
          { status: 403 }
        );
      }
    }

    // Build public Cloudinary URL
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const publicId = lesson.cloudinaryPublicId;
    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;

    console.log("Streaming from:", videoUrl);

    const videoResponse = await fetch(videoUrl);

    if (!videoResponse.ok) {
      console.error("Cloudinary error:", videoResponse.status);
      return NextResponse.json({ error: "Failed to fetch video" }, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", "video/mp4");
    headers.set("Cache-Control", "private, no-store");
    headers.set("Accept-Ranges", "bytes");

    const contentLength = videoResponse.headers.get("Content-Length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new NextResponse(videoResponse.body, {
      status: videoResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Video proxy error:", error);
    return NextResponse.json({ error: "Failed to stream video" }, { status: 500 });
  }
}