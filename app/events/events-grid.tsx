"use client";

import { useState } from "react";
import { Event } from "@/lib/events";

// ─── EVENT MODAL ──────────────────────────────────────────────────────────────

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

function EventModal({ event, onClose }: EventModalProps) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1B3A6B] rounded-t-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
          <div className="flex items-start justify-between gap-4 relative">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold bg-[#C9902A] text-white px-2.5 py-0.5 rounded-full">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="font-serif text-white text-2xl leading-snug">{event.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center shrink-0 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Event details */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Date",
                value: formattedDate,
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Time",
                value: event.time,
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Location",
                value: event.location,
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                label: "Host",
                value: event.host,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{event.fullDescription}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag) => (
              <span key={tag} className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* RSVP */}
          <div className="border-t border-gray-100 pt-6">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-serif text-[#1B3A6B] text-lg mb-1">You're registered!</h4>
                <p className="text-sm text-gray-500">
                  We'll send confirmation details to <span className="font-semibold">{form.email}</span>
                </p>
              </div>
            ) : isFull ? (
              <div className="text-center py-4 bg-red-50 rounded-xl">
                <p className="text-sm font-semibold text-red-600">This event is fully booked.</p>
                <p className="text-xs text-red-400 mt-1">Check back for future events.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-[#1B3A6B] text-lg">RSVP for This Event</h4>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.isFree ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {event.isFree ? "Free" : `$${event.price}`}
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#C9902A] hover:bg-[#b57d22] text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                  >
                    {event.isFree ? "Reserve My Spot — Free" : `RSVP — $${event.price}`}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining out of {event.capacity}
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-50 text-blue-700",
  Outreach: "bg-green-50 text-green-700",
  Training: "bg-purple-50 text-purple-700",
  Youth: "bg-orange-50 text-orange-700",
  Special: "bg-rose-50 text-rose-700",
};

interface EventCardProps {
  event: Event;
  isPast: boolean;
  onOpen: (event: Event) => void;
}

function EventCard({ event, isPast, onOpen }: EventCardProps) {
  const spotsLeft = event.capacity - event.registered;
  const percentFull = Math.round((event.registered / event.capacity) * 100);
  const isFull = spotsLeft <= 0;

  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("en-GB", { month: "short" });

  return (
    <div
      className={`group bg-white border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col ${
        isPast
          ? "border-gray-100 opacity-75 hover:opacity-90"
          : "border-gray-100 hover:shadow-lg hover:border-[#1B3A6B]/20"
      }`}
      onClick={() => onOpen(event)}
    >
      {/* Date banner */}
      <div className={`relative h-28 flex items-center px-5 gap-5 overflow-hidden ${isPast ? "bg-gray-400" : "bg-[#1B3A6B]"}`}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />

        {/* Date badge */}
        <div className="bg-white rounded-xl px-3 py-2 text-center shrink-0 relative">
          <p className="text-2xl font-serif text-[#1B3A6B] font-bold leading-none">{day}</p>
          <p className="text-xs text-[#C9902A] font-bold uppercase">{month}</p>
        </div>

        {/* Quick info */}
        <div className="relative">
          <p className="text-white font-serif text-lg leading-snug line-clamp-2 group-hover:text-white/90">
            {event.title}
          </p>
          <p className="text-white/60 text-xs mt-1">{event.time}</p>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {event.featured && !isPast && (
            <span className="text-xs font-semibold bg-[#C9902A] text-white px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
          {isPast && (
            <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              Past
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + Online badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[event.category]}`}>
            {event.category}
          </span>
          {event.isOnline && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
              Online
            </span>
          )}
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ml-auto ${event.isFree ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
            {event.isFree ? "Free" : `$${event.price}`}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {event.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>

        {/* Capacity bar */}
        {!isPast && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{event.registered} registered</span>
              <span className={isFull ? "text-red-500 font-semibold" : ""}>{isFull ? "Full" : `${spotsLeft} spots left`}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${isFull ? "bg-red-400" : percentFull > 80 ? "bg-amber-400" : "bg-[#C9902A]"}`}
                style={{ width: `${percentFull}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(event); }}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isPast
              ? "bg-gray-100 text-gray-500"
              : isFull
              ? "bg-red-50 text-red-500 cursor-not-allowed"
              : "bg-[#1B3A6B] hover:bg-[#C9902A] text-white"
          }`}
        >
          {isPast ? "View Details" : isFull ? "Fully Booked" : "RSVP Now"}
        </button>
      </div>
    </div>
  );
}

// ─── EVENTS GRID ──────────────────────────────────────────────────────────────

interface EventsGridProps {
  events: Event[];
  isPast: boolean;
}

export default function EventsGrid({ events, isPast }: EventsGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">
          No {isPast ? "past" : "upcoming"} events found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isPast={isPast}
            onOpen={setSelectedEvent}
          />
        ))}
      </div>
    </>
  );
}