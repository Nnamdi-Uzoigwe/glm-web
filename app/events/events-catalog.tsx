"use client";

import { useState } from "react";
import EventsFilter from "./events-filter";
import EventsGrid from "./events-grid";
import { events, EventCategory, EventStatus, isUpcoming } from "@/lib/events";

export default function EventsCatalog() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [activeStatus, setActiveStatus] = useState<EventStatus>("Upcoming");

  const filtered = events.filter((event) => {
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    const matchesStatus =
      activeStatus === "Upcoming" ? isUpcoming(event) : !isUpcoming(event);
    return matchesCategory && matchesStatus;
  });

  // Sort: upcoming by soonest, past by most recent
  const sorted = [...filtered].sort((a, b) => {
    const diff =
      new Date(a.date).getTime() - new Date(b.date).getTime();
    return activeStatus === "Upcoming" ? diff : -diff;
  });

  return (
    <>
      <EventsFilter
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        onCategoryChange={setActiveCategory}
        onStatusChange={setActiveStatus}
      />
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#1B3A6B]">{sorted.length}</span>{" "}
              {sorted.length === 1 ? "event" : "events"}
              {activeCategory !== "All" && (
                <span>
                  {" "}in{" "}
                  <span className="font-semibold text-[#C9902A]">{activeCategory}</span>
                </span>
              )}
            </p>
          </div>
          <EventsGrid events={sorted} isPast={activeStatus === "Past"} />
        </div>
      </section>
    </>
  );
}