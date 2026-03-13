"use client";

import { useState } from "react";
import SermonFilters from "./sermon-filters";
import SermonGrid from "./sermon-grid";
import { sermons, SermonSeries } from "@/lib/ministry";

export default function SermonCatalog() {
  const [activeSeries, setActiveSeries] = useState<SermonSeries>("All");
  const [activeSpeaker, setActiveSpeaker] = useState("All Speakers");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sermons.filter((s) => {
    const matchesSeries = activeSeries === "All" || s.series === activeSeries;
    const matchesSpeaker = activeSpeaker === "All Speakers" || s.speaker === activeSpeaker;
    const matchesSearch =
      searchQuery === "" ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scripture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeries && matchesSpeaker && matchesSearch;
  });

  return (
    <>
      <SermonFilters
        activeSeries={activeSeries}
        activeSpeaker={activeSpeaker}
        searchQuery={searchQuery}
        onSeriesChange={setActiveSeries}
        onSpeakerChange={setActiveSpeaker}
        onSearchChange={setSearchQuery}
      />
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-[#1B3A6B]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "sermon" : "sermons"}
              {activeSeries !== "All" && (
                <span> in <span className="font-semibold text-[#C9902A]">{activeSeries}</span></span>
              )}
            </p>
          </div>
          <SermonGrid sermons={filtered} />
        </div>
      </section>
    </>
  );
}