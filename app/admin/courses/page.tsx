import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { toggleCoursePublished, deleteCourse } from "@/app/actions/admin";

export default async function AdminCoursesPage() {
  const allCourses = await db.select().from(courses).orderBy(courses.createdAt);

  const lessonCounts = await Promise.all(
    allCourses.map((course) =>
      db.select({ count: count() }).from(lessons)
        .where(eq(lessons.courseId, course.id))
        .then((r) => ({ courseId: course.id, count: r[0].count }))
    )
  );

  const countMap = Object.fromEntries(lessonCounts.map((l) => [l.courseId, l.count]));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Courses</h1>
          <p className="text-gray-400 text-sm">{allCourses.length} course{allCourses.length !== 1 ? "s" : ""} total</p>
        </div>
        <a
          href="/admin/courses/new"
          className="bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300"
        >
          + New Course
        </a>
      </div>

      {allCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">📚</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No courses yet</h3>
          <p className="text-gray-400 text-sm mb-6">Create your first course to get started.</p>
          <a href="/admin/courses/new" className="inline-block bg-[#1B3A6B] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#C9902A] transition-all duration-300">
            Create Course →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Course</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Lessons</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Price</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1B3A6B]">{course.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {countMap[course.id] ?? 0} lessons
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                    {course.isFree ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₦${(course.price / 100).toLocaleString()}`
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${course.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-xs text-[#1B3A6B] hover:text-[#C9902A] font-semibold transition-colors"
                      >
                        Edit
                      </a>
                      <span className="text-gray-200">|</span>
                      <form action={toggleCoursePublished.bind(null, course.id, course.published)}>
                        <button type="submit" className="text-xs text-gray-400 hover:text-[#1B3A6B] font-semibold transition-colors">
                          {course.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <span className="text-gray-200">|</span>
                      <form action={deleteCourse.bind(null, course.id)}>
                        <button type="submit" className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}