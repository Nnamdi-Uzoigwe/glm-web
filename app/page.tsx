import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import CoursesPreview from "@/components/home/CoursesPreview";
import EventsSection from "@/components/home/EventsSection";
import GiveSection from "@/components/home/GiveSection";

export default function HomePage() {
  return (
    <>
        <HeroSection />
        <MissionSection />
        <CoursesPreview />
        <EventsSection />
        <GiveSection />
    </>
  );
}