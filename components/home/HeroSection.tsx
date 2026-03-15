"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SLIDES = [
  {
    id: 1,
    image: "/hero-1.jpg",
  },
  {
    id: 2,
    image: "/hero-2.jpg",
  },
  {
    id: 3,
    image: "/hero-3.jpg",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  };

  const goToNext = () => {
    goTo((current + 1) % SLIDES.length);
  };

  const goPrev = () => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .animate-pulse-dot { animation: pulse-dot 2s infinite; }
        @keyframes slide-fade-in {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-slide-in { animation: slide-fade-in 0.8s ease forwards; }
        @keyframes content-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-content-up { animation: content-up 0.7s ease 0.2s both; }
      `}</style>

      <section className="font-dm relative min-h-screen flex items-center overflow-hidden">

        {/* ── Background Carousel ─────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100 animate-slide-in" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0c1f3d]/90 via-[#0c1f3d]/75 to-[#0c1f3d]/50" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0c1f3d] to-transparent" />
        </div>

        {/* ── Subtle Grid Overlay ──────────────────────────────── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Gold glow accent ────────────────────────────────── */}
        <div className="absolute top-1/4 right-16 w-96 h-96 rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(201,144,42,0.18) 0%, transparent 65%)" }} />

        {/* ── Main Content ────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="animate-content-up">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(201,144,42,0.15)] border border-[rgba(201,144,42,0.3)] rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9902A] animate-pulse-dot" />
              <span className="text-[#f0c97a] text-xs font-medium tracking-widest uppercase">Live Sunday Service — Join Us</span>
            </div>

            {/* Title */}
            <h1 className="font-cormorant text-5xl lg:text-[4.2rem] font-bold text-white leading-[1.1] mb-6">
              Spreading the{" "}
              <em className="italic text-[#f0c97a]">Gospel Light</em>{" "}
              to Every Nation
            </h1>

            {/* Description */}
            <p className="text-white/70 text-[1.05rem] leading-relaxed font-light max-w-lg mb-10">
              Join a growing community of believers equipped through powerful gospel ministry,
              discipleship courses, and Spirit-filled outreach reaching the world with Christ's love.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.95rem] text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #C9902A, #e0a83a)",
                  boxShadow: "0 4px 20px rgba(201,144,42,0.4)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Explore Courses
              </Link>
              <Link
                href="/ministry/sermons"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-[0.95rem] text-white border border-white/20 bg-white/8 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.14] hover:border-white/30"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
                </svg>
                Watch Sermon
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-10 pt-8 border-t border-white/10">
              {[
                { number: "5K+", label: "Members" },
                { number: "40+", label: "Courses" },
                { number: "12",  label: "Nations" },
              ].map(({ number, label }) => (
                <div key={label}>
                  <div className="font-cormorant text-[2rem] font-bold text-[#f0c97a] leading-none">{number}</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sermon Card */}
          <div className="relative hidden lg:block">
            {/* Floating badge */}
            <div
              className="absolute -top-4 right-6 z-10 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border"
              style={{
                background: "#1B3A6B",
                borderColor: "rgba(201,144,42,0.4)",
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #C9902A, #e0a83a)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div className="text-sm text-white font-medium leading-tight">
                New Course Live
                <span className="block text-xs text-white/50 font-normal">Everyday Evangelism</span>
              </div>
            </div>

            {/* Main card */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Gold top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.75"
                style={{ background: "linear-gradient(90deg, #C9902A, #f0c97a, #C9902A)" }} />

              <p className="text-[#C9902A] text-xs font-semibold uppercase tracking-widest mb-4">🎙 Latest Sermon</p>

              {/* Thumbnail */}
              <div
                className="w-full h-44 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1B3A6B, #0c1f3d)" }}
              >
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(201,144,42,0.2), transparent 60%)" }} />
                <button
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{ background: "rgba(201,144,42,0.9)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </button>
              </div>

              <div className="font-cormorant text-xl font-semibold text-white mb-2">
                Walking in the Light of the Gospel
              </div>
              <div className="flex items-center gap-4 text-white/50 text-[0.82rem]">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  42 mins
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  Pastor James Okafor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Carousel Controls ────────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5">
          {/* Prev */}
          <button
            onClick={goPrev}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-[#C9902A]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goToNext}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

      </section>
    </>
  );
}