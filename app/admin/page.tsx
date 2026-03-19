// import { db } from "@/db";
// import { courses, purchases, users } from "@/db/schema";
// import { eq, count, sum } from "drizzle-orm";

// export default async function AdminDashboard() {
//   const [
//     totalCourses,
//     publishedCourses,
//     totalUsers,
//     totalPurchases,
//     totalRevenue,
//     recentPurchases,
//   ] = await Promise.all([
//     db.select({ count: count() }).from(courses).then((r) => r[0].count),
//     db.select({ count: count() }).from(courses).where(eq(courses.published, true)).then((r) => r[0].count),
//     db.select({ count: count() }).from(users).then((r) => r[0].count),
//     db.select({ count: count() }).from(purchases).then((r) => r[0].count),
//     db.select({ total: sum(purchases.amountPaid) }).from(purchases).then((r) => r[0].total),
//     db.select().from(purchases).orderBy(purchases.createdAt).limit(5),
//   ]);

//   const stats = [
//     { label: "Total Courses", value: totalCourses, icon: "📚", color: "bg-blue-50 text-blue-700" },
//     { label: "Published", value: publishedCourses, icon: "✅", color: "bg-green-50 text-green-700" },
//     { label: "Total Users", value: totalUsers, icon: "👥", color: "bg-purple-50 text-purple-700" },
//     { label: "Total Purchases", value: totalPurchases, icon: "🛒", color: "bg-amber-50 text-amber-700" },
//     {
//       label: "Total Revenue",
//       value: `₦${((Number(totalRevenue) || 0) / 100).toLocaleString()}`,
//       icon: "💰",
//       color: "bg-emerald-50 text-emerald-700",
//     },
//   ];

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Dashboard</h1>
//         <p className="text-gray-400 text-sm">Overview of Gospel Light Ministries platform</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
//         {stats.map((stat) => (
//           <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
//             <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${stat.color}`}>
//               {stat.icon}
//             </div>
//             <p className="font-serif text-[#1B3A6B] text-2xl font-bold">{stat.value}</p>
//             <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Quick actions */}
//       <div className="grid sm:grid-cols-3 gap-4 mb-10">
//         {[
//           { label: "Create New Course", href: "/admin/courses/new", icon: "➕", desc: "Add a course with lessons and videos" },
//           { label: "Manage Courses", href: "/admin/courses", icon: "📋", desc: "Edit, publish or unpublish courses" },
//           { label: "View Users", href: "/admin/users", icon: "👥", desc: "See all registered users" },
//         ].map((action) => (
//           <a
//             key={action.label}
//             href={action.href}
//             className="bg-white rounded-2xl border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-sm p-6 transition-all duration-200 group"
//           >
//             <span className="text-3xl block mb-3">{action.icon}</span>
//             <p className="font-semibold text-[#1B3A6B] text-sm group-hover:text-[#C9902A] transition-colors">{action.label}</p>
//             <p className="text-gray-400 text-xs mt-1">{action.desc}</p>
//           </a>
//         ))}
//       </div>

//       {/* Recent purchases */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-6">
//         <h2 className="font-serif text-[#1B3A6B] text-lg mb-5">Recent Purchases</h2>
//         {recentPurchases.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center py-8">No purchases yet</p>
//         ) : (
//           <div className="space-y-3">
//             {recentPurchases.map((purchase) => (
//               <div key={purchase.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">{purchase.courseTitle}</p>
//                   <p className="text-xs text-gray-400">{new Date(purchase.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
//                 </div>
//                 <span className="text-sm font-semibold text-[#C9902A]">
//                   ₦{(purchase.amountPaid / 100).toLocaleString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { db } from "@/db";
import { courses, purchases, users, devotionals } from "@/db/schema";
import { eq, count, sum } from "drizzle-orm";

export default async function AdminDashboard() {
  const [
    totalCourses,
    publishedCourses,
    totalUsers,
    totalPurchases,
    totalRevenue,
    totalDevotionals,
    recentPurchases,
  ] = await Promise.all([
    db.select({ count: count() }).from(courses).then((r) => r[0].count),
    db.select({ count: count() }).from(courses).where(eq(courses.published, true)).then((r) => r[0].count),
    db.select({ count: count() }).from(users).then((r) => r[0].count),
    db.select({ count: count() }).from(purchases).then((r) => r[0].count),
    db.select({ total: sum(purchases.amountPaid) }).from(purchases).then((r) => r[0].total),
    db.select({ count: count() }).from(devotionals).where(eq(devotionals.published, true)).then((r) => r[0].count),
    db.select().from(purchases).orderBy(purchases.createdAt).limit(5),
  ]);

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: "📚", color: "bg-blue-50 text-blue-700" },
    { label: "Published", value: publishedCourses, icon: "✅", color: "bg-green-50 text-green-700" },
    { label: "Devotionals", value: totalDevotionals, icon: "📖", color: "bg-indigo-50 text-indigo-700" },
    { label: "Total Users", value: totalUsers, icon: "👥", color: "bg-purple-50 text-purple-700" },
    { label: "Total Purchases", value: totalPurchases, icon: "🛒", color: "bg-amber-50 text-amber-700" },
    {
      label: "Total Revenue",
      value: `₦${((Number(totalRevenue) || 0) / 100).toLocaleString()}`,
      icon: "💰",
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  const quickActions = [
    { label: "Create New Course", href: "/admin/courses/new", icon: "➕", desc: "Add a course with lessons and videos" },
    { label: "Manage Courses", href: "/admin/courses", icon: "📋", desc: "Edit, publish or unpublish courses" },
    { label: "New Devotional", href: "/admin/devotionals/new", icon: "📖", desc: "Write and publish a new devotional" },
    { label: "Manage Devotionals", href: "/admin/devotionals", icon: "🗂️", desc: "Edit or unpublish devotionals" },
    { label: "New Event", href: "/admin/events/new", icon: "📅", desc: "Create and publish a new event" },
    { label: "Manage Events", href: "/admin/events", icon: "🗓️", desc: "Edit, publish or delete events" },
    { label: "View Users", href: "/admin/users", icon: "👥", desc: "See all registered users" },
    { label: "View Messages", href: "/admin/messages", icon: "✉️", desc: "Read contact form submissions" },
    { label: "View Donations", href: "/admin/donations", icon: "💝", desc: "Track all donations received" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of Gospel Light Ministries platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="font-serif text-[#1B3A6B] text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quickActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="bg-white rounded-2xl border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-sm p-6 transition-all duration-200 group"
          >
            <span className="text-3xl block mb-3">{action.icon}</span>
            <p className="font-semibold text-[#1B3A6B] text-sm group-hover:text-[#C9902A] transition-colors">{action.label}</p>
            <p className="text-gray-400 text-xs mt-1">{action.desc}</p>
          </a>
        ))}
      </div>

      {/* Recent purchases */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-serif text-[#1B3A6B] text-lg mb-5">Recent Purchases</h2>
        {recentPurchases.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No purchases yet</p>
        ) : (
          <div className="space-y-3">
            {recentPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{purchase.courseTitle}</p>
                  <p className="text-xs text-gray-400">{new Date(purchase.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <span className="text-sm font-semibold text-[#C9902A]">
                  ₦{(purchase.amountPaid / 100).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}