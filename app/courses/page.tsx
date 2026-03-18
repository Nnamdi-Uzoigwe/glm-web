
// import { db } from "@/db";
// import { courses } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import CourseCatalog from "./course-catalog";
// import CourseHero from "./course-hero";

// export default async function CoursesPage() {
//   const allCourses = await db
//     .select()
//     .from(courses)
//     .where(eq(courses.published, true))
//     .orderBy(courses.createdAt);

//   const mapped = allCourses.map((c) => ({
//     id: c.id,
//     slug: c.slug,
//     title: c.title,
//     description: c.description,
//     instructor: c.instructor,
//     category: c.category,
//     level: c.level,
//     price: c.price,
//     isFree: c.isFree,
//     thumbnailUrl: c.thumbnailUrl,
//     rating: 5,
//     studentsCount: 0,
//     featured: false,
//   }));

//   return (
//     <main>
//       <CourseHero />
//       <CourseCatalog courses={mapped} />
//     </main>
//   );
// }

import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import CourseCatalog from "./course-catalog";
import CourseHero from "./course-hero";

export default async function CoursesPage() {
  const allCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.published, true))
    .orderBy(courses.createdAt);

  // For each course, fetch the first lesson to generate a thumbnail
  const mapped = await Promise.all(
    allCourses.map(async (c) => {
      // Use stored thumbnailUrl if admin set one manually
      let thumbnailUrl = c.thumbnailUrl;

      if (!thumbnailUrl) {
        // Auto-generate from first lesson video
        const firstLesson = await db
          .select({ cloudinaryPublicId: lessons.cloudinaryPublicId })
          .from(lessons)
          .where(eq(lessons.courseId, c.id))
          .orderBy(lessons.order)
          .limit(1)
          .then((r) => r[0]);

        if (firstLesson?.cloudinaryPublicId) {
          thumbnailUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/so_2/${firstLesson.cloudinaryPublicId}.jpg`;
        }
      }

      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        instructor: c.instructor,
        category: c.category,
        level: c.level,
        price: c.price,
        isFree: c.isFree,
        thumbnailUrl,
        rating: 5,
        studentsCount: 0,
        featured: false,
      };
    })
  );

  return (
    <main>
      <CourseHero />
      <CourseCatalog courses={mapped} />
    </main>
  );
}