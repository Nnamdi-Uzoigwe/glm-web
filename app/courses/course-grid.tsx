"use client";

import Link from "next/link";
import { DBCourse } from "./course-catalog";

interface CourseGridProps {
  courses: DBCourse[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= rating ? "text-[#C9902A]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.slug}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#1B3A6B]/20 transition-all duration-300 flex flex-col">
          <div className="h-40 bg-[#1B3A6B] relative overflow-hidden">
            {course.thumbnailUrl ? (
              <img src={course.thumbnailUrl} alt={course.title} className=" absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              {course.featured && <span className="text-xs font-semibold bg-[#C9902A] text-white px-2.5 py-0.5 rounded-full">Featured</span>}
              <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">{course.level}</span>
            </div>
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.isFree ? "bg-green-500 text-white" : "bg-white text-[#1B3A6B]"}`}>
                {course.isFree ? "FREE" : `₦${(course.price / 100).toLocaleString()}`}
              </span>
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <span className="text-xs font-medium text-[#C9902A] mb-1">{course.category}</span>
            <h3 className="font-serif text-[#1B3A6B] text-lg leading-snug mb-1 group-hover:text-[#C9902A] transition-colors line-clamp-2">{course.title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{course.description}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[10px] font-bold text-[#1B3A6B]">{course.instructor[0]}</div>
                <span className="text-xs text-gray-500">{course.instructor}</span>
              </div>
              <StarRating rating={course.rating} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}