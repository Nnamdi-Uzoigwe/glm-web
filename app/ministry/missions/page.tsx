import { MissionsHero, MissionsGrid, MissionsPartners } from "./missions";

export const metadata = {
  title: "Missions | Gospel Light Ministries",
  description: "Join us in carrying the Gospel to every nation, tribe, and tongue.",
};

export default function MissionsPage() {
  return (
    <main>
      <MissionsHero />
      <MissionsGrid />
      <MissionsPartners />
    </main>
  );
}