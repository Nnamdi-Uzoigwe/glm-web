"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SLIDES = [
  { id: 1, image: "/hero-1.jpg" },
  { id: 2, image: "/hero-2.jpg" },
  { id: 3, image: "/hero-3.jpg" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-start lg:justify-center pt-14 font-dm overflow-hidden">

        {/* Background slider */}
        <div className="absolute inset-0 z-0">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === current ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-r from-[#0c1f3d]/90 via-[#0c1f3d]/75 to-[#0c1f3d]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl px-6 animate-fadeUp text-left lg:text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9902A]/15 border border-[#C9902A]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C9902A] animate-pulse" />
            <span className="text-[#f0c97a] text-xs uppercase tracking-widest">
              On-Demand Gospel Courses
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Spreading the{" "}
            <span className="italic text-[#f0c97a]">Gospel Light</span>{" "}
            to Every Nation
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl lg:mx-auto">
            Join a growing community of believers equipped through powerful gospel
            ministry, discipleship courses, and Spirit-filled outreach reaching
            the world with Christ's love.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-start lg:justify-center gap-4 mb-12">
            <Link
              href="/courses"
              className="px-7 py-3.5 rounded-xl font-semibold text-white transition hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #C9902A, #e0a83a)",
                boxShadow: "0 8px 30px rgba(201,144,42,0.4)",
              }}
            >
              Explore Courses
            </Link>
            <Link
              href="/about"
              className="px-7 py-3.5 rounded-xl text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-start lg:justify-center gap-10 border-t border-white/10 pt-8">
            {[
              { number: "5K+", label: "Members" },
              { number: "40+", label: "Courses" },
              { number: "12", label: "Nations" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-cormorant text-3xl font-bold text-[#f0c97a]">
                  {item.number}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 lg:left-1/2 lg:-translate-x-1/2 flex gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all ${
                i === current ? "w-6 h-2 bg-[#C9902A]" : "w-2 h-2 bg-white/40"
              } rounded-full`}
            />
          ))}
        </div>
      </section>
    </>
  );
}