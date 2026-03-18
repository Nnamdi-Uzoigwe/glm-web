import { db } from "@/db";
import { users, purchases } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";

export default async function AdminUsersPage() {
  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  // Get purchase count per user
  const purchaseCounts = await db
    .select({ userId: purchases.userId, count: count() })
    .from(purchases)
    .groupBy(purchases.userId);

  const countMap = Object.fromEntries(
    purchaseCounts.map((p) => [p.userId, p.count])
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Users</h1>
          <p className="text-gray-400 text-sm">{allUsers.length} registered user{allUsers.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {allUsers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">👥</p>
            <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No users yet</h3>
            <p className="text-gray-400 text-sm">Users will appear here once they register.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">User</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Email</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Role</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Courses</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Joined</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Auth</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => {
                const initials = user.name
                  ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                  : user.email?.[0].toUpperCase() ?? "?";

                const isGoogle = !user.password;
                const courseCount = countMap[user.id] ?? 0;

                return (
                  <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    {/* Avatar + name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${user.role === "admin" ? "bg-[#C9902A] text-white" : "bg-[#1B3A6B]/10 text-[#1B3A6B]"}`}>
                          {initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {user.name ?? "—"}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-sm text-gray-500">{user.email}</td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === "admin" ? "bg-[#C9902A]/15 text-[#C9902A]" : "bg-gray-100 text-gray-500"}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Courses purchased */}
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${courseCount > 0 ? "text-[#1B3A6B]" : "text-gray-300"}`}>
                        {courseCount} {courseCount === 1 ? "course" : "courses"}
                      </span>
                    </td>

                    {/* Joined date */}
                    <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Auth method */}
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${isGoogle ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                        {isGoogle ? (
                          <>
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Email
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}