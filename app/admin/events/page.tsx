import { db } from "@/db";
import { events, eventRsvps } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { toggleEventPublished, deleteEvent } from "@/actions/events";

export default async function AdminEventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(events.createdAt);

  const rsvpCounts = await db
    .select({ eventId: eventRsvps.eventId, count: count() })
    .from(eventRsvps)
    .groupBy(eventRsvps.eventId);

  const countMap = Object.fromEntries(rsvpCounts.map((r) => [r.eventId, r.count]));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Events</h1>
          <p className="text-gray-400 text-sm">{allEvents.length} event{allEvents.length !== 1 ? "s" : ""} total</p>
        </div>
        <a href="/admin/events/new" className="bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300">
          + New Event
        </a>
      </div>

      {allEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">📅</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No events yet</h3>
          <p className="text-gray-400 text-sm mb-6">Create your first event to get started.</p>
          <a href="/admin/events/new" className="inline-block bg-[#1B3A6B] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#C9902A] transition-all duration-300">
            Create Event →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Event</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">RSVPs</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1B3A6B] line-clamp-1">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.host}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{event.date}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-2.5 py-1 rounded-full">{event.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1B3A6B]">{countMap[event.id] ?? 0}</span>
                      <span className="text-xs text-gray-400">/ {event.capacity}</span>
                      <a href={`/admin/events/${event.id}/rsvps`} className="text-xs text-[#C9902A] hover:underline font-medium">
                        View
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${event.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {event.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <a href={`/admin/events/${event.id}/edit`} className="text-xs text-[#1B3A6B] hover:text-[#C9902A] font-semibold transition-colors">Edit</a>
                      <span className="text-gray-200">|</span>
                      <form action={toggleEventPublished.bind(null, event.id, event.published)}>
                        <button type="submit" className="text-xs text-gray-400 hover:text-[#1B3A6B] font-semibold transition-colors">
                          {event.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <span className="text-gray-200">|</span>
                      <form action={deleteEvent.bind(null, event.id)}>
                        <button type="submit" className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">Delete</button>
                      </form>
                    </div>
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