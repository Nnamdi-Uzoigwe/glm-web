// import { auth } from "@/auth";
// import { db } from "@/db";
// import { purchases, courses } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";
// import { signOut } from "@/auth";
// import Image from "next/image";

// export default async function AccountPage() {
//   const session = await auth();

//   if (!session?.user) redirect("/sign-in");

//   // const userPurchases = await db
//   //   .select()
//   //   .from(purchases)
//   //   .where(eq(purchases.userId, session.user.id));

//   const userPurchases = await db
//   .select({
//     id: purchases.id,
//     courseId: purchases.courseId,
//     courseTitle: purchases.courseTitle,
//     completedLessons: purchases.completedLessons,
//     createdAt: purchases.createdAt,
//     courseSlug: courses.slug,
//   })
//   .from(purchases)
//   .leftJoin(courses, eq(purchases.courseId, courses.id))
//   .where(eq(purchases.userId, session.user.id));

//   const initials = session.user.name
//     ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
//     : session.user.email?.[0].toUpperCase();

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-[#1B3A6B]">
//         <div className="max-w-5xl mx-auto px-6 py-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               {session.user.image ? (
//                 <Image
//                   src={session.user.image}
//                   alt={session.user.name ?? "User"}
//                   width={56}
//                   height={56}
//                   className="rounded-full border-2 border-white/20"
//                 />
//               ) : (
//                 <div className="w-14 h-14 rounded-full bg-[#C9902A] flex items-center justify-center text-white font-bold text-xl">
//                   {initials}
//                 </div>
//               )}
//               <div>
//                 <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">
//                   Welcome back
//                 </p>
//                 <h1 className="font-serif text-white text-2xl">
//                   {session.user.name ?? session.user.email}
//                 </h1>
//                 <p className="text-white/50 text-sm">{session.user.email}</p>
//               </div>
//             </div>

//             {/* Sign out */}
//             <form
//               action={async () => {
//                 "use server";
//                 await signOut({ redirectTo: "/" });
//               }}
//             >
//               <button
//                 type="submit"
//                 className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 Sign Out
//               </button>
//             </form>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { label: "Courses Enrolled", value: userPurchases.length },
//               {
//                 label: "Lessons Completed",
//                 value: userPurchases.reduce(
//                   (acc, p) => acc + (p.completedLessons?.length ?? 0), 0
//                 ),
//               },
//               {
//                 label: "Member Since",
//                 value: new Date().toLocaleDateString("en-GB", {
//                   month: "short",
//                   year: "numeric",
//                 }),
//               },
//             ].map((stat) => (
//               <div
//                 key={stat.label}
//                 className="bg-white/10 border border-white/15 rounded-xl px-5 py-4 text-center"
//               >
//                 <p className="text-2xl font-serif text-white font-bold">{stat.value}</p>
//                 <p className="text-white/50 text-xs mt-1">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-10">
//         {/* My Courses */}
//         <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">My Courses</h2>

//         {userPurchases.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
//             <div className="w-16 h-16 bg-[#1B3A6B]/8 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#1B3A6B]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//               </svg>
//             </div>
//             <h3 className="font-serif text-[#1B3A6B] text-lg mb-2">No courses yet</h3>
//             <p className="text-gray-400 text-sm mb-6">
//               Enrol in a course to start your learning journey.
//             </p>
//             <a
//               href="/courses"
//               className="inline-block bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300"
//             >
//               Browse Courses →
//             </a>
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {userPurchases.map((purchase) => {
//               const completed = purchase.completedLessons?.length ?? 0;
//               return (
//                 <div
//                   key={purchase.id}
//                   className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="w-10 h-10 bg-[#1B3A6B]/8 rounded-xl flex items-center justify-center mb-4">
//                     <svg className="w-5 h-5 text-[#1B3A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                   <h3 className="font-semibold text-[#1B3A6B] text-sm mb-1 line-clamp-2">
//                     {purchase.courseTitle}
//                   </h3>
//                   <p className="text-xs text-gray-400 mb-4">
//                     {completed} lesson{completed !== 1 ? "s" : ""} completed
//                   </p>
//                   <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
//                     <div
//                       className="h-1.5 bg-[#C9902A] rounded-full"
//                       style={{ width: completed > 0 ? "40%" : "0%" }}
//                     />
//                   </div>
//                   <a
//                     href={`/courses/${purchase.courseId}`}
//                     className="block text-center bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-300"
//                   >
//                     Continue Learning →
//                   </a>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Quick links */}
//         <h2 className="font-serif text-[#1B3A6B] text-xl mt-10 mb-5">Quick Links</h2>
//         <div className="grid sm:grid-cols-3 gap-4">
//           {[
//             { label: "Browse Courses", href: "/courses", icon: "📚" },
//             { label: "Upcoming Events", href: "/events", icon: "📅" },
//             { label: "Give / Donate", href: "/give", icon: "🙏" },
//           ].map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               className="bg-white border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3 transition-all duration-200"
//             >
//               <span className="text-2xl">{link.icon}</span>
//               <span className="text-sm font-semibold text-[#1B3A6B]">{link.label}</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import { auth } from "@/auth";
import { db } from "@/db";
import { purchases, courses, users, lessons } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import Image from "next/image";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const dbUser = await db
    .select({ createdAt: users.createdAt })
    .from(users)
    .where(eq(users.id, session.user.id))
    .then((r) => r[0]);

  const userPurchases = await db
    .select({
      id: purchases.id,
      courseId: purchases.courseId,
      courseTitle: purchases.courseTitle,
      completedLessons: purchases.completedLessons,
      createdAt: purchases.createdAt,
      courseSlug: courses.slug,
    })
    .from(purchases)
    .leftJoin(courses, eq(purchases.courseId, courses.id))
    .where(eq(purchases.userId, session.user.id));

  // Fetch lesson counts per course
  const lessonCounts = await Promise.all(
    userPurchases.map((p) =>
      db
        .select({ count: count() })
        .from(lessons)
        .where(eq(lessons.courseId, p.courseId))
        .then((r) => ({ courseId: p.courseId, total: r[0].count })),
    ),
  );

  const lessonCountMap = Object.fromEntries(
    lessonCounts.map((l) => [l.courseId, l.total]),
  );

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : session.user.email?.[0].toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B3A6B]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-white/20"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#C9902A] flex items-center justify-center text-white font-bold text-xl">
                  {initials}
                </div>
              )}
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">
                  Welcome back
                </p>
                <h1 className="font-serif text-white text-2xl">
                  {session.user.name ?? session.user.email}
                </h1>
                <p className="text-white/50 text-sm">{session.user.email}</p>
              </div>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Courses Enrolled", value: userPurchases.length },
              {
                label: "Lessons Completed",
                value: userPurchases.reduce((acc, p) => {
                  const total = lessonCountMap[p.courseId] ?? 0;
                  const completed = Math.min(
                    p.completedLessons?.length ?? 0,
                    total,
                  );
                  return acc + completed;
                }, 0),
              },
              {
                label: "Member Since",
                value: new Date(
                  dbUser?.createdAt ?? Date.now(),
                ).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-xl px-5 py-4 text-center"
              >
                <p className="text-2xl font-serif text-white font-bold">
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* My Courses */}
        <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">My Courses</h2>

        {userPurchases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-[#1B3A6B]/8 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#1B3A6B]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-serif text-[#1B3A6B] text-lg mb-2">
              No courses yet
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Enrol in a course to start your learning journey.
            </p>
            <a
              href="/courses"
              className="inline-block bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Browse Courses →
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {userPurchases.map((purchase) => {
              const total = lessonCountMap[purchase.courseId] ?? 1;
              const completed = Math.min(
                purchase.completedLessons?.length ?? 0,
                total,
              );
              const progress =
                total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <div
                  key={purchase.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#1B3A6B]/8 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-5 h-5 text-[#1B3A6B]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#1B3A6B] text-sm mb-1 line-clamp-2">
                    {purchase.courseTitle}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {completed} of {total} lesson{total !== 1 ? "s" : ""}{" "}
                    completed
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                    <div
                      className="h-1.5 bg-[#C9902A] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <a
                    href={`/courses/${purchase.courseSlug}`}
                    className="block text-center bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-300"
                  >
                    Continue Learning →
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick links */}
        <h2 className="font-serif text-[#1B3A6B] text-xl mt-10 mb-5">
          Quick Links
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Browse Courses", href: "/courses", icon: "📚" },
            { label: "Upcoming Events", href: "/events", icon: "📅" },
            { label: "Give / Donate", href: "/give", icon: "🙏" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="bg-white border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-sm rounded-2xl px-5 py-4 flex items-center gap-3 transition-all duration-200"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-semibold text-[#1B3A6B]">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
