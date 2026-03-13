import { Course } from "@/lib/courses";

interface CourseInstructorProps {
  course: Course;
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  const { instructor } = course;

  return (
    <section className="bg-gray-50 py-14 lg:py-20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3 block">
            Your Instructor
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] mb-8">
            Meet the Teacher
          </h2>

          <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-5 mb-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white font-bold text-xl shrink-0">
                {instructor.initials}
              </div>
              <div>
                <h3 className="font-serif text-[#1B3A6B] text-xl">
                  {instructor.name}
                </h3>
                <p className="text-[#C9902A] text-sm font-semibold mt-0.5">
                  {instructor.role}
                </p>

                {/* Rating + students inline */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#C9902A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating.toFixed(1)} Instructor Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {course.studentCount.toLocaleString()} Students
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {course.lessonCount} Lessons
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {instructor.bio}
            </p>

            {/* Credentials */}
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Credentials
              </p>
              <ul className="space-y-2">
                {instructor.credentials.map((cred) => (
                  <li key={cred} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#C9902A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}