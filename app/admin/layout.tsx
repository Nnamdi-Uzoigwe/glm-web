// import { auth } from "@/auth";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session?.user) redirect("/sign-in");

//   // Check role from database (don't trust session alone for admin)
//   const user = await db
//     .select()
//     .from(users)
//     .where(eq(users.id, session.user.id))
//     .then((r) => r[0]);

//   if (!user || user.role !== "admin") {
//     redirect("/account");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Admin topbar */}
//       <div className="bg-[#1B3A6B] border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-[#C9902A] rounded-lg flex items-center justify-center">
//               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-white font-semibold text-sm">GLM Admin</p>
//               <p className="text-white/40 text-xs">Content Management</p>
//             </div>
//           </div>
//           <nav className="flex items-center gap-1">
//             {[
//               { label: "Dashboard", href: "/admin" },
//               { label: "Courses", href: "/admin/courses" },
//               { label: "New Course", href: "/admin/courses/new" },
//               { label: "Users", href: "/admin/users" },
//             ].map((item) => (
//               <a
//                 key={item.href}
//                 href={item.href}
//                 className="text-white/60 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm transition-all"
//               >
//                 {item.label}
//               </a>
//             ))}
//             <a
//               href="/account"
//               className="text-white/40 hover:text-white/60 px-3 py-1.5 text-sm transition-all ml-2"
//             >
//               ← Back to site
//             </a>
//           </nav>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
//     </div>
//   );
// }

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .then((r) => r[0]);

  if (!user || user.role !== "admin") {
    redirect("/account");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Courses", href: "/admin/courses" },
    { label: "New Course", href: "/admin/courses/new" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1B3A6B] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top row */}
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C9902A] rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm leading-none">GLM Admin</p>
                <p className="text-white/40 text-xs mt-0.5">Content Management</p>
              </div>
              <p className="text-white font-semibold text-sm sm:hidden">Admin</p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 mr-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() ?? "A"}
                </div>
                <span className="text-white/60 text-xs">{user.email}</span>
              </div>

              <a
                href="/"
                className="hidden sm:flex items-center gap-1.5 text-white/50 hover:text-white/80 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to site
              </a>

              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-all hover:bg-white/10"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          </div>

          {/* Nav row */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all shrink-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}