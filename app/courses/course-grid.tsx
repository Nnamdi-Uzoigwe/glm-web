// import Link from "next/link";
// import { Course } from "@/lib/courses";

// interface CourseCardProps {
//   course: Course;
// }

// function CourseCard({ course }: CourseCardProps) {
//   const levelColors: Record<string, string> = {
//     Beginner: "bg-green-50 text-green-700",
//     Intermediate: "bg-blue-50 text-blue-700",
//     Advanced: "bg-purple-50 text-purple-700",
//   };

//   return (
//     <Link href={`/courses/${course.slug}`} className="group block">
//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#1B3A6B]/20 transition-all duration-300 h-full flex flex-col">
//         {/* Card top banner */}
//         <div className="relative bg-[#1B3A6B] h-36 flex items-center justify-center overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
//           <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#C9902A]/20 -translate-x-1/3 translate-y-1/3" />

//           {/* Instructor initials */}
//           <div className="relative w-14 h-14 rounded-full bg-[#C9902A] flex items-center justify-center text-white font-bold text-lg">
//             {course.instructor.initials}
//           </div>

//           {/* Featured badge */}
//           {course.featured && (
//             <div className="absolute top-3 left-3 bg-[#C9902A] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
//               Featured
//             </div>
//           )}

//           {/* Price badge */}
//           <div className="absolute top-3 right-3">
//             {course.isFree ? (
//               <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                 FREE
//               </span>
//             ) : (
//               <span className="bg-white text-[#1B3A6B] text-xs font-bold px-3 py-1 rounded-full">
//                 ${course.price}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Card body */}
//         <div className="p-5 flex flex-col flex-1">
//           {/* Category + Level */}
//           <div className="flex items-center gap-2 mb-3">
//             <span className="text-xs font-semibold text-[#C9902A] tracking-wide uppercase">
//               {course.category}
//             </span>
//             <span className="text-gray-300">•</span>
//             <span
//               className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level]}`}
//             >
//               {course.level}
//             </span>
//           </div>

//           {/* Title */}
//           <h3 className="font-serif text-[#1B3A6B] text-lg leading-snug mb-1 group-hover:text-[#C9902A] transition-colors duration-200">
//             {course.title}
//           </h3>
//           <p className="text-xs text-gray-500 mb-3">{course.subtitle}</p>

//           {/* Rating */}
//           <div className="flex items-center gap-1 mb-4">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <svg
//                 key={star}
//                 className={`w-3.5 h-3.5 ${
//                   star <= Math.round(course.rating)
//                     ? "text-[#C9902A]"
//                     : "text-gray-200"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-xs text-gray-500 ml-0.5">
//               {course.rating.toFixed(1)} ({course.reviewCount})
//             </span>
//           </div>

//           {/* Spacer */}
//           <div className="flex-1" />

//           {/* Meta footer */}
//           <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between">
//             <div className="flex items-center gap-3 text-xs text-gray-500">
//               <span className="flex items-center gap-1">
//                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//                 {course.lessonCount} lessons
//               </span>
//               <span className="flex items-center gap-1">
//                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {course.duration}
//               </span>
//             </div>
//             <span className="text-xs text-[#1B3A6B] font-semibold group-hover:text-[#C9902A] transition-colors">
//               View Course →
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// interface CourseGridProps {
//   courses: Course[];
// }

// export default function CourseGrid({ courses }: CourseGridProps) {
//   if (courses.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <p className="text-gray-500 text-sm">No courses found. Try a different category or search term.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {courses.map((course) => (
//         <CourseCard key={course.id} course={course} />
//       ))}
//     </div>
//   );
// }


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
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
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