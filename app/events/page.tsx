import EventsHero from "./events-hero";
import EventsCatalog from "./events-catalog";

export const metadata = {
  title: "Events | Gospel Light Ministries",
  description:
    "From city-wide outreaches to intimate training days — see what's happening at Gospel Light Ministries.",
};

export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <EventsCatalog />
    </main>
  );
}