import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/lib/courses";
import CourseDetailHero from "./course-details-hero";
import CourseSyllabus from "./course-syllabus";
import CourseInstructor from "./course-instructor";
import Link from "next/link";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} | Gospel Light Ministries`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <main>
      <CourseDetailHero course={course} />
      <CourseSyllabus course={course} />
      <CourseInstructor course={course} />

      {/* Bottom enroll CTA */}
      <section className="bg-[#1B3A6B] py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3 block">
            Ready to Begin?
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-white mb-4">
            Start {course.title} Today
          </h2>
          <p className="text-white/65 text-sm mb-8 max-w-md mx-auto">
            Join {course.studentCount.toLocaleString()} students already
            enrolled. Learn at your own pace with lifetime access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#C9902A] hover:bg-[#b57d22] text-white font-semibold px-10 py-3.5 rounded-xl transition-colors duration-200 text-base w-full sm:w-auto">
              {course.isFree ? "Enroll for Free" : `Enroll — $${course.price}`}
            </button>
            <Link
              href="/courses"
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              ← Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}