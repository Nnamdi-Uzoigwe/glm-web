// import EventsHero from "./events-hero";
// import EventsCatalog from "./events-catalog";

// export const metadata = {
//   title: "Events | Gospel Light Ministries",
//   description:
//     "From city-wide outreaches to intimate training days — see what's happening at Gospel Light Ministries.",
// };

// export default function EventsPage() {
//   return (
//     <main>
//       <EventsHero />
//       <EventsCatalog />
//     </main>
//   );
// }

import { db } from "@/db";
import { events, eventRsvps } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import EventsHero from "./events-hero";
import EventsCatalog from "./events-catalog";

export default async function EventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(events.date);

  const rsvpCounts = await db
    .select({ eventId: eventRsvps.eventId, count: count() })
    .from(eventRsvps)
    .groupBy(eventRsvps.eventId);

  const countMap = Object.fromEntries(rsvpCounts.map((r) => [r.eventId, r.count]));

  const mapped = allEvents.map((e) => ({
    id: e.id,
    title: e.title,
    category: e.category as "Conference" | "Outreach" | "Training" | "Youth" | "Special",
    date: e.date,
    time: e.time,
    location: e.location,
    isOnline: e.isOnline,
    address: e.address ?? undefined,
    description: e.description,
    fullDescription: e.fullDescription ?? e.description,
    host: e.host,
    hostInitials: e.host.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    capacity: e.capacity,
    registered: countMap[e.id] ?? 0,
    isFree: e.isFree,
    price: 0,
    tags: [],
    featured: e.featured,
  }));

  const nextEvent = mapped
    .filter((e) => new Date(e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <main>
      <EventsHero nextEvent={nextEvent} />
      <EventsCatalog events={mapped} />
    </main>
  );
}