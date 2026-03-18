// import Link from "next/link";
// import { db } from "@/db";
// import { courses } from "@/db/schema";
// import { eq, desc } from "drizzle-orm";

// export default async function CoursesPreview() {
//   const latestCourses = await db
//     .select()
//     .from(courses)
//     .where(eq(courses.published, true))
//     .orderBy(desc(courses.createdAt))
//     .limit(3);

//   const mapped = latestCourses.map((c) => ({
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
//   }));

//   return (
//     <section className="bg-[#f4f6fb] py-24 px-8 font-sans">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
//           <div>
//             <p className="text-xs uppercase tracking-widest text-[#C9902A] font-semibold mb-2">
//               Learn & Grow
//             </p>
//             <h2 className="font-serif text-4xl font-bold text-[#1B3A6B] leading-tight">
//               Featured Courses
//             </h2>
//           </div>
//           <Link
//             href="/courses"
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B3A6B] border-b border-[#1B3A6B]/25 pb-0.5 hover:text-[#C9902A] hover:border-[#C9902A] transition-all"
//           >
//             View All Courses
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>

//         {/* Grid */}
//         {mapped.length === 0 ? (
//           <div className="text-center py-20 text-gray-400 text-sm">
//             No courses available yet. Check back soon!
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {mapped.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-white rounded-2xl overflow-hidden border border-[#1B3A6B]/6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#1B3A6B]/10 hover:border-[#1B3A6B]/10"
//               >
//                 {/* Thumbnail */}
//                 <div className="h-40 bg-[#1B3A6B] relative overflow-hidden">
//                   {course.thumbnailUrl ? (
//                     <img
//                       src={course.thumbnailUrl}
//                       alt={course.title}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   )}
//                   {/* Glow overlay */}
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,144,42,0.15),transparent_60%)]" />

//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 flex gap-2 z-10">
//                     <span className="text-[0.7rem] font-bold bg-[#C9902A] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide">
//                       {course.category}
//                     </span>
//                     <span className="text-[0.7rem] font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
//                       {course.level}
//                     </span>
//                   </div>
//                   <div className="absolute top-3 right-3 z-10">
//                     <span className={`text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${course.isFree ? "bg-green-500 text-white" : "bg-white text-[#1B3A6B]"}`}>
//                       {course.isFree ? "FREE" : `₦${(course.price / 100).toLocaleString()}`}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Body */}
//                 <div className="p-6 flex-1 flex flex-col">
//                   <h3 className="font-serif text-[#1B3A6B] text-xl font-bold leading-snug mb-2 line-clamp-2">
//                     {course.title}
//                   </h3>
//                   <p className="text-[0.85rem] text-gray-500 leading-relaxed font-light flex-1 line-clamp-2 mb-5">
//                     {course.description}
//                   </p>

//                   {/* Instructor */}
//                   <div className="flex items-center gap-2 pt-4 border-t border-[#1B3A6B]/6">
//                     <div className="w-6 h-6 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[10px] font-bold text-[#1B3A6B] shrink-0">
//                       {course.instructor[0]}
//                     </div>
//                     <span className="text-xs text-gray-400 truncate">{course.instructor}</span>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="px-6 pb-6 flex items-center justify-between">
//                   <div className="font-serif text-2xl font-bold text-[#1B3A6B]">
//                     {course.isFree ? (
//                       "Free"
//                     ) : (
//                       <>
//                         ₦{(course.price / 100).toLocaleString()}
//                         <span className="font-sans text-sm font-normal text-gray-400 ml-1">/ one-time</span>
//                       </>
//                     )}
//                   </div>
//                   <Link
//                     href={`/courses/${course.slug}`}
//                     className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#C9902A] hover:-translate-y-px transition-all duration-200"
//                   >
//                     Enroll
//                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import Link from "next/link";
import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function CoursesPreview() {
  const latestCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.published, true))
    .orderBy(desc(courses.createdAt))
    .limit(3);

  const mapped = await Promise.all(
    latestCourses.map(async (c) => {
      let thumbnailUrl = c.thumbnailUrl;

      if (!thumbnailUrl) {
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
      };
    })
  );

  return (
    <section className="bg-[#f4f6fb] py-24 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C9902A] font-semibold mb-2">Learn & Grow</p>
            <h2 className="font-serif text-4xl font-bold text-[#1B3A6B] leading-tight">Featured Courses</h2>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B3A6B] border-b border-[#1B3A6B]/25 pb-0.5 hover:text-[#C9902A] hover:border-[#C9902A] transition-all">
            View All Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {mapped.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">No courses available yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapped.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-[#1B3A6B]/6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#1B3A6B]/10 hover:border-[#1B3A6B]/10">
                <div className="h-40 bg-[#1B3A6B] relative overflow-hidden">
                  {course.thumbnailUrl ? (
                    <img src={course.thumbnailUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,144,42,0.15),transparent_60%)]" />
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className="text-[0.7rem] font-bold bg-[#C9902A] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide">{course.category}</span>
                    <span className="text-[0.7rem] font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">{course.level}</span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${course.isFree ? "bg-green-500 text-white" : "bg-white text-[#1B3A6B]"}`}>
                      {course.isFree ? "FREE" : `₦${(course.price / 100).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-[#1B3A6B] text-xl font-bold leading-snug mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-[0.85rem] text-gray-500 leading-relaxed font-light flex-1 line-clamp-2 mb-5">{course.description}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[#1B3A6B]/6">
                    <div className="w-6 h-6 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[10px] font-bold text-[#1B3A6B] shrink-0">{course.instructor[0]}</div>
                    <span className="text-xs text-gray-400 truncate">{course.instructor}</span>
                  </div>
                </div>

                <div className="px-6 pb-6 flex items-center justify-between">
                  <div className="font-serif text-2xl font-bold text-[#1B3A6B]">
                    {course.isFree ? "Free" : (
                      <>{`₦${(course.price / 100).toLocaleString()}`}<span className="font-sans text-sm font-normal text-gray-400 ml-1">/ one-time</span></>
                    )}
                  </div>
                  <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#C9902A] hover:-translate-y-px transition-all duration-200">
                    Enroll
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}