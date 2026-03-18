import { db } from "@/db";
import { prayerRequests } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PrayerHero, PrayerWall } from "./prayer";

export default async function PrayerPage() {
  const requests = await db
    .select()
    .from(prayerRequests)
    .orderBy(desc(prayerRequests.createdAt));

  // Mask anonymous names server-side before passing to client
  const masked = requests.map((r) => ({
    ...r,
    name: r.isAnonymous ? "Anonymous" : r.name,
  }));

  return (
    <main>
      <PrayerHero />
      <PrayerWall initialRequests={masked} />
    </main>
  );
}