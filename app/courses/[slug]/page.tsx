import { db } from "@/db";
import { courses, lessons, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import PurchaseButton from "@/components/courses/PurchaseButton";
import VideoPlayer from "@/components/courses/VideoPlayer";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const course = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .then((r) => r[0]);

  if (!course || !course.published) notFound();

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, course.id))
    .orderBy(lessons.order);

  // Check if user has purchased this course
  const hasPurchased = session?.user
    ? await db
        .select()
        .from(purchases)
        .where(eq(purchases.userId, session.user.id))
        .then((rows) => rows.some((p) => p.courseId === course.id))
    : false;

  const firstLesson = courseLessons[0];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#1B3A6B]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-widest uppercase mb-3">
                {course.category}
              </span>
              <h1 className="font-serif text-white text-4xl leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span>👨‍🏫 {course.instructor}</span>
                <span>📚 {courseLessons.length} lessons</span>
                <span>🎯 {course.level}</span>
              </div>
            </div>

            {/* Purchase card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-3xl font-serif text-[#1B3A6B] font-bold mb-1">
                {course.isFree ? "Free" : `₦${(course.price / 100).toLocaleString()}`}
              </div>
              <p className="text-gray-400 text-xs mb-5">Lifetime access to all lessons</p>

              {hasPurchased || course.isFree ? (
                <div>
                  <div className="bg-green-50 border border-green-100 text-green-700 text-sm font-semibold text-center py-2.5 rounded-xl mb-4">
                    ✅ You have access to this course
                  </div>
                  {firstLesson && (
                    <a
                      href={`#lesson-${firstLesson.id}`}
                      className="block text-center bg-[#1B3A6B] hover:bg-[#C9902A] text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      Start Watching →
                    </a>
                  )}
                </div>
              ) : (
                <PurchaseButton
                  courseId={course.id}
                  courseTitle={course.title}
                  price={course.price}
                  isLoggedIn={!!session?.user}
                />
              )}

              <ul className="mt-5 space-y-2">
                {[
                  "Lifetime access",
                  "Watch on any device",
                  `${courseLessons.length} video lessons`,
                  "Certificate of completion",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-[#C9902A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-serif text-[#1B3A6B] text-2xl mb-6">Course Lessons</h2>
        <div className="space-y-4">
          {courseLessons.map((lesson, index) => {
            const canWatch = hasPurchased || course.isFree || lesson.isFreePreview;
            return (
              <div
                key={lesson.id}
                id={`lesson-${lesson.id}`}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${canWatch ? "bg-[#1B3A6B] text-white" : "bg-gray-100 text-gray-400"}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1B3A6B] text-sm">{lesson.title}</p>
                    {lesson.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{lesson.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.isFreePreview && (
                      <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
                        Free Preview
                      </span>
                    )}
                    {!canWatch && (
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Video player — only shown if user can watch */}
                {canWatch && (
                  <div className="px-5 pb-5">
                    <VideoPlayer lessonId={lesson.id} title={lesson.title} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}