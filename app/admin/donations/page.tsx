import { db } from "@/db";
import { donations } from "@/db/schema";
import { desc, sum, count } from "drizzle-orm";

export default async function AdminDonationsPage() {
  const allDonations = await db
    .select()
    .from(donations)
    .orderBy(desc(donations.createdAt));

  const stats = await db
    .select({ total: sum(donations.amount), count: count() })
    .from(donations)
    .then((r) => r[0]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Donations</h1>
          <p className="text-gray-400 text-sm">{allDonations.length} donation{allDonations.length !== 1 ? "s" : ""} total</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Total Raised</p>
          <p className="font-serif text-[#1B3A6B] text-3xl font-bold">
            ₦{((Number(stats.total) || 0) / 100).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Total Donors</p>
          <p className="font-serif text-[#1B3A6B] text-3xl font-bold">{stats.count}</p>
        </div>
      </div>

      {allDonations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">🙏</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No donations yet</h3>
          <p className="text-gray-400 text-sm">Donations will appear here once received.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Donor</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Fund</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Frequency</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Amount</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {allDonations.map((donation) => (
                <tr key={donation.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-xs font-bold text-[#1B3A6B] shrink-0">
                        {donation.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{donation.name}</p>
                        <p className="text-xs text-gray-400">{donation.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-2.5 py-1 rounded-full">{donation.fund}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${donation.frequency === "one-time" ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                      {donation.frequency}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#C9902A]">
                    ₦{(donation.amount / 100).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(donation.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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