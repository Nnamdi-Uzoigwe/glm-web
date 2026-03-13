"use client";

import { eventCategories, EventCategory, EventStatus } from "@/lib/events";

interface EventsFilterProps {
  activeCategory: EventCategory;
  activeStatus: EventStatus;
  onCategoryChange: (c: EventCategory) => void;
  onStatusChange: (s: EventStatus) => void;
}

export default function EventsFilter({
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
}: EventsFilterProps) {
  return (
    <section className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1B3A6B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upcoming / Past toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
            {(["Upcoming", "Past"] as EventStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeStatus === status
                    ? "bg-[#1B3A6B] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}