"use client";

import { useEffect, useState } from "react";
import { getNextEvent } from "@/lib/events";

function useCountdown(targetDate: string) {
  const calculate = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="bg-white/15 border border-white/20 rounded-xl px-4 py-3 min-w-16">
        <p className="text-2xl lg:text-3xl font-serif text-white font-bold leading-none">
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <p className="text-xs text-white/50 mt-1.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function EventsHero() {
  const nextEvent = getNextEvent();
  const countdown = useCountdown(nextEvent?.date ?? "");

  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
              What's On
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
              Events &<br />Gatherings
            </h1>
            <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
            <p className="text-white/70 text-lg leading-relaxed">
              From city-wide outreaches to intimate training days — there's
              always something happening at Gospel Light. Come and be part of it.
            </p>
          </div>

          {/* Right — next event countdown */}
          {nextEvent && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 lg:p-8">
              <p className="text-[#C9902A] text-xs font-semibold uppercase tracking-widest mb-4">
                Next Event
              </p>
              <h3 className="font-serif text-white text-xl lg:text-2xl leading-snug mb-2">
                {nextEvent.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mb-6">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(nextEvent.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{nextEvent.time}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  {nextEvent.isOnline ? "🌐" : "📍"} {nextEvent.isOnline ? "Online" : nextEvent.location}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex gap-3 mb-6">
                <CountdownUnit value={countdown.days} label="Days" />
                <CountdownUnit value={countdown.hours} label="Hours" />
                <CountdownUnit value={countdown.minutes} label="Mins" />
                <CountdownUnit value={countdown.seconds} label="Secs" />
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${nextEvent.isFree ? "bg-green-500/20 text-green-300" : "bg-[#C9902A]/20 text-[#C9902A]"}`}>
                  {nextEvent.isFree ? "Free Entry" : `$${nextEvent.price}`}
                </span>
                <span className="text-xs text-white/50">
                  {nextEvent.capacity - nextEvent.registered} spots remaining
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}