"use client";

import { useState } from "react";
import { prayerRequests, prayerCategories, PrayerRequest } from "@/lib/ministry";

// ─── HERO ─────────────────────────────────────────────────────────────────────

export function PrayerHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            Community Prayer
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
            Prayer Wall
          </h1>
          <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
          <p className="text-white/70 text-lg leading-relaxed mb-5">
            Carry one another's burdens and so fulfil the law of Christ. Share
            your prayer request and let the family stand with you.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 inline-block">
            <p className="text-white font-serif italic text-sm">
              "Bear one another's burdens, and so fulfill the law of Christ."
            </p>
            <p className="text-[#C9902A] text-xs mt-1 font-semibold">— Galatians 6:2</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REQUEST FORM ─────────────────────────────────────────────────────────────

export function PrayerRequestForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    request: "",
    anonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", category: "", request: "", anonymous: false });
  };

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <div>
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
              Submit a Request
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] mb-4">
              We're Praying With You
            </h2>
            <div className="w-12 h-1 bg-[#C9902A] rounded-full mb-5" />
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              You don't have to face your battles alone. Submit your prayer
              request and our community will stand with you in faith. All
              requests are treated with love and confidentiality.
            </p>
            <div className="space-y-3">
              {[
                { icon: "🙏", text: "Our prayer team prays over every request" },
                { icon: "🔒", text: "You can submit anonymously if preferred" },
                { icon: "❤️", text: "The community can pray alongside you" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">Request Received</h3>
                <p className="text-gray-500 text-sm">
                  We're standing with you in prayer. God hears every cry of His children.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder={form.anonymous ? "Anonymous" : "First name or full name"}
                    value={form.anonymous ? "" : form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={form.anonymous}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-all"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.anonymous}
                      onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                      className="w-4 h-4 accent-[#1B3A6B]"
                    />
                    <span className="text-xs text-gray-500">Submit anonymously</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white transition-all text-gray-700"
                  >
                    <option value="">Select a category</option>
                    {prayerCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    Your Prayer Request
                  </label>
                  <textarea
                    placeholder="Share what's on your heart..."
                    value={form.request}
                    onChange={(e) => setForm({ ...form, request: e.target.value })}
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C9902A] hover:bg-[#b57d22] text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                  Submit Prayer Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRAYER WALL ──────────────────────────────────────────────────────────────

function PrayerCard({ request }: { request: PrayerRequest }) {
  const [prayed, setPrayed] = useState(false);
  const [count, setCount] = useState(request.prayerCount);

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setCount((c) => c + 1);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-[#1B3A6B]/20 transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-semibold text-[#C9902A] uppercase tracking-wide">
            {request.category}
          </span>
          <p className="text-xs text-gray-400 mt-0.5">{request.date}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold shrink-0">
          {request.name === "Anonymous" ? "?" : request.name.slice(0, 2).toUpperCase()}
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
        {request.request}
      </p>

      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <p className="text-xs text-gray-500 font-medium">{request.name}</p>
        <button
          onClick={handlePray}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
            prayed
              ? "bg-rose-100 text-rose-600"
              : "bg-gray-100 text-gray-500 hover:bg-rose-100 hover:text-rose-600"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill={prayed ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {count} Praying
        </button>
      </div>
    </div>
  );
}

export function PrayerWall() {
  return (
    <section className="bg-gray-50 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Community
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] mb-3">
            Prayer Wall
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Click "Praying" on any request to let someone know you're standing
            with them in faith.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {prayerRequests.map((req) => (
            <PrayerCard key={req.id} request={req} />
          ))}
        </div>
      </div>
    </section>
  );
}