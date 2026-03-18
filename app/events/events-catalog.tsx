"use client";

import { useState } from "react";
import EventsFilter from "./events-filter";
import EventsGrid from "./events-grid";

type EventCategory = "All" | "Conference" | "Outreach" | "Training" | "Youth" | "Special";
type EventStatus = "Upcoming" | "Past";

export interface DBEvent {
  id: string;
  title: string;
  category: "Conference" | "Outreach" | "Training" | "Youth" | "Special";
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  address?: string;
  description: string;
  fullDescription: string;
  host: string;
  hostInitials: string;
  capacity: number;
  registered: number;
  isFree: boolean;
  price: number;
  tags: string[];
  featured: boolean;
}

export default function EventsCatalog({ events }: { events: DBEvent[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [activeStatus, setActiveStatus] = useState<EventStatus>("Upcoming");

  const isUpcoming = (e: DBEvent) => new Date(e.date) >= new Date(new Date().toDateString());

  const filtered = events
    .filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesStatus = activeStatus === "Upcoming" ? isUpcoming(e) : !isUpcoming(e);
      return matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return activeStatus === "Upcoming" ? diff : -diff;
    });

  return (
    <>
      <EventsFilter
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        onCategoryChange={(c) => setActiveCategory(c as EventCategory)}
        onStatusChange={setActiveStatus}
      />
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#1B3A6B]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "event" : "events"}
              {activeCategory !== "All" && (
                <span> in <span className="font-semibold text-[#C9902A]">{activeCategory}</span></span>
              )}
            </p>
          </div>
          <EventsGrid events={filtered} isPast={activeStatus === "Past"} />
        </div>
      </section>
    </>
  );
}