"use client";

import { useState } from "react";
import { Course } from "@/lib/courses";

interface CourseSyllabusProps {
  course: Course;
}

export default function CourseSyllabus({ course }: CourseSyllabusProps) {
  const [openModules, setOpenModules] = useState<string[]>([course.modules[0]?.id]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Header */}
            <span className="text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3 block">
              Course Content
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] mb-2">
              Syllabus
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              {course.modules.length} modules • {totalLessons} lessons •{" "}
              {course.duration} total
            </p>

            {/* Modules accordion */}
            <div className="space-y-3">
              {course.modules.map((module, index) => {
                const isOpen = openModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* Module header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#1B3A6B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-serif text-[#1B3A6B] text-base">
                            {module.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {module.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Lessons list */}
                    {isOpen && (
                      <div className="divide-y divide-gray-100">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                {lesson.preview ? (
                                  <svg className="w-3.5 h-3.5 text-[#C9902A]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{lesson.title}</span>
                              {lesson.preview && (
                                <span className="text-xs bg-[#C9902A]/10 text-[#C9902A] px-2 py-0.5 rounded-full font-medium">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 shrink-0 ml-3">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* What you'll learn */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <span className="text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3 block">
                Outcomes
              </span>
              <h3 className="font-serif text-[#1B3A6B] text-xl mb-5">
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                {course.whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#C9902A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}