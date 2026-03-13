"use client";

import { useState } from "react";
import { categories, CourseCategory } from "@/lib/courses";

interface CourseFiltersProps {
  onCategoryChange: (category: CourseCategory) => void;
  onSearchChange: (query: string) => void;
}

export default function CourseFilters({
  onCategoryChange,
  onSearchChange,
}: CourseFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category: CourseCategory) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <section className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[#1B3A6B] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-gray-50 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}