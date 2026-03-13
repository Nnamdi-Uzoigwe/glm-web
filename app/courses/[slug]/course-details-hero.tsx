"use client";

import Link from "next/link";
import { Course } from "@/lib/courses";

interface CourseDetailHeroProps {
  course: Course;
}

export default function CourseDetailHero({ course }: CourseDetailHeroProps) {
  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  return (
    <section className="bg-[#1B3A6B] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* Left — course info */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
              <Link href="/courses" className="hover:text-white/80 transition-colors">
                Courses
              </Link>
              <span>/</span>
              <span className="text-[#C9902A]">{course.category}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold text-[#C9902A] tracking-widest uppercase">
                {course.category}
              </span>
              <span className="text-white/30">•</span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${levelColors[course.level]}`}>
                {course.level}
              </span>
              {course.featured && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#C9902A] text-white">
                    Featured
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-serif text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-white/70 text-lg mb-5">{course.subtitle}</p>
            <div className="w-12 h-1 bg-[#C9902A] rounded-full mb-6" />
            <p className="text-white/65 leading-relaxed mb-8 max-w-xl">
              {course.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(course.rating) ? "text-[#C9902A]" : "text-white/20"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-semibold">{course.rating.toFixed(1)}</span>
                <span>({course.reviewCount} reviews)</span>
              </div>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {course.studentCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration} total
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {course.lessonCount} lessons
              </span>
            </div>
          </div>

          {/* Right — sticky enroll card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              {/* Price */}
              <div className="mb-5">
                {course.isFree ? (
                  <div>
                    <span className="text-4xl font-serif text-[#1B3A6B] font-bold">Free</span>
                    <p className="text-sm text-gray-500 mt-1">No payment required</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-serif text-[#1B3A6B] font-bold">${course.price}</span>
                    <span className="text-gray-400 text-sm ml-2">one-time payment</span>
                    <p className="text-sm text-gray-500 mt-1">Lifetime access included</p>
                  </div>
                )}
              </div>

              {/* Enroll button */}
              <button className="w-full bg-[#C9902A] hover:bg-[#b57d22] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-base mb-3">
                {course.isFree ? "Enroll for Free" : `Enroll — $${course.price}`}
              </button>
              <button className="w-full border border-[#1B3A6B] text-[#1B3A6B] font-semibold py-3 rounded-xl hover:bg-[#1B3A6B] hover:text-white transition-all duration-200 text-sm">
                Preview Course
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                30-day money-back guarantee
              </p>

              {/* What's included */}
              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                {[
                  `${course.lessonCount} video lessons`,
                  `${course.duration} of content`,
                  "Downloadable study notes",
                  "Certificate of completion",
                  "Lifetime access",
                  "Mobile & desktop access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}