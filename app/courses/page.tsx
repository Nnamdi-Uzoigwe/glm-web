import CourseHero from "./course-hero";
import CourseCatalog from "./course-catalog";

export const metadata = {
  title: "Courses | Gospel Light Ministries",
  description:
    "Browse our gospel-centred ministry courses. Learn at your own pace from anywhere in the world.",
};

export default function CoursesPage() {
  return (
    <main>
      <CourseHero />
      <CourseCatalog />
    </main>
  );
}