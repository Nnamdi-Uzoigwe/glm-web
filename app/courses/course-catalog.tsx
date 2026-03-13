"use client";

import { useState } from "react";
import CourseFilters from "./course-filters";
import CourseGrid from "./course-grid";
import { courses, CourseCategory } from "@/lib/courses";

export default function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <CourseFilters
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-[#1B3A6B]">
                {filteredCourses.length}
              </span>{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
              {activeCategory !== "All" && (
                <span>
                  {" "}in{" "}
                  <span className="font-semibold text-[#C9902A]">
                    {activeCategory}
                  </span>
                </span>
              )}
            </p>
          </div>
          <CourseGrid courses={filteredCourses} />
        </div>
      </section>
    </>
  );
}