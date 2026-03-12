import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import FeaturedSermon from "@/components/home/FeaturedSermon";
import CoursesPreview from "@/components/home/CoursesPreview";
import EventsSection from "@/components/home/EventsSection";
import GiveSection from "@/components/home/GiveSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <FeaturedSermon />
        <CoursesPreview />
        <EventsSection />
        <GiveSection />
      </main>
      <Footer />
    </>
  );
}