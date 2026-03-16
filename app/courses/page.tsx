// import CourseHero from "./course-hero";
// import CourseCatalog from "./course-catalog";

// export const metadata = {
//   title: "Courses | Gospel Light Ministries",
//   description:
//     "Browse our gospel-centred ministry courses. Learn at your own pace from anywhere in the world.",
// };

// export default function CoursesPage() {
//   return (
//     <main>
//       <CourseHero />
//       <CourseCatalog />
//     </main>
//   );
// }


import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import CourseCatalog from "./course-catalog";
import CourseHero from "./course-hero";

export default async function CoursesPage() {
  const allCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.published, true))
    .orderBy(courses.createdAt);

  const mapped = allCourses.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    instructor: c.instructor,
    category: c.category,
    level: c.level,
    price: c.price,
    isFree: c.isFree,
    thumbnailUrl: c.thumbnailUrl,
    rating: 5,
    studentsCount: 0,
    featured: false,
  }));

  return (
    <main>
      <CourseHero />
      <CourseCatalog courses={mapped} />
    </main>
  );
}