import { db } from "@/db";
import { events, eventRsvps } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EventRsvpsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await db.select().from(events).where(eq(events.id, id)).then((r) => r[0]);
  if (!event) notFound();

  const rsvps = await db
    .select()
    .from(eventRsvps)
    .where(eq(eventRsvps.eventId, id))
    .orderBy(eventRsvps.createdAt);

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <a href="/admin/events" className="text-gray-400 hover:text-[#1B3A6B] text-sm transition-colors">← Events</a>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">RSVPs</h1>
          <p className="text-gray-400 text-sm">{event.title}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-serif font-bold text-[#1B3A6B]">{rsvps.length}</p>
          <p className="text-xs text-gray-400">of {event.capacity} capacity</p>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">📋</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No RSVPs yet</h3>
          <p className="text-gray-400 text-sm">RSVPs will appear here once people register.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">#</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Name</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Email</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp, i) => (
                <tr key={rsvp.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-xs font-bold text-[#1B3A6B] shrink-0">
                        {rsvp.name[0].toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{rsvp.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{rsvp.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(rsvp.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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