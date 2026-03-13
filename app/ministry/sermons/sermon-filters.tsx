"use client";

import { sermonSeries, speakers, SermonSeries } from "@/lib/ministry";

interface SermonFiltersProps {
  activeSeries: SermonSeries;
  activeSpeaker: string;
  searchQuery: string;
  onSeriesChange: (s: SermonSeries) => void;
  onSpeakerChange: (s: string) => void;
  onSearchChange: (s: string) => void;
}

export default function SermonFilters({
  activeSeries,
  activeSpeaker,
  searchQuery,
  onSeriesChange,
  onSpeakerChange,
  onSearchChange,
}: SermonFiltersProps) {
  return (
    <section className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 space-y-3">
        {/* Series tabs */}
        <div className="flex flex-wrap gap-2">
          {sermonSeries.map((s) => (
            <button
              key={s}
              onClick={() => onSeriesChange(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSeries === s
                  ? "bg-[#1B3A6B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Speaker + Search row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={activeSpeaker}
            onChange={(e) => onSpeakerChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] text-gray-700 transition-all"
          >
            {speakers.map((sp) => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>

          <div className="relative flex-1 sm:max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-gray-50 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}