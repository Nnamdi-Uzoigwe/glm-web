import { PrayerHero, PrayerRequestForm, PrayerWall } from "./prayer";

export const metadata = {
  title: "Prayer Wall | Gospel Light Ministries",
  description: "Share your prayer request and let the community stand with you in faith.",
};

export default function PrayerPage() {
  return (
    <main>
      <PrayerHero />
      <PrayerRequestForm />
      <PrayerWall />
    </main>
  );
}