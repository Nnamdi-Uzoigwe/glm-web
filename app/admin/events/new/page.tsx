"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Conference", "Outreach", "Training", "Youth", "Special"];

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    isOnline: false,
    address: "",
    description: "",
    fullDescription: "",
    host: "",
    capacity: "100",
    isFree: true,
    featured: false,
  });

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, capacity: parseInt(form.capacity) }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save");
        return;
      }

      router.push("/admin/events");
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">New Event</h1>
        <p className="text-gray-400 text-sm">Fill in the details and save as draft or publish directly.</p>
      </div>

      {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">Event Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Event Title *</label>
              <input type="text" required placeholder="e.g. Gospel Light Annual Conference 2026" value={form.title} onChange={set("title")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category *</label>
              <select required value={form.category} onChange={set("category")} className={inputClass}>
                <option value="">Select category…</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Host / Speaker *</label>
              <input type="text" required placeholder="e.g. Pastor John Adeyemi" value={form.host} onChange={set("host")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Date *</label>
              <input type="date" required value={form.date} onChange={set("date")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Time *</label>
              <input type="text" required placeholder="e.g. 9:00 AM – 6:00 PM" value={form.time} onChange={set("time")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Location *</label>
              <input type="text" required placeholder="e.g. GLM Auditorium or Online (Zoom)" value={form.location} onChange={set("location")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Capacity *</label>
              <input type="number" required min="1" value={form.capacity} onChange={set("capacity")} className={inputClass} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Address <span className="text-gray-300">(optional for in-person)</span></label>
              <input type="text" placeholder="e.g. 14 Kingdom Avenue, Lagos" value={form.address} onChange={set("address")} className={inputClass} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Short Description *</label>
              <input type="text" required placeholder="One line summary of the event" value={form.description} onChange={set("description")} className={inputClass} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Description</label>
              <textarea rows={5} placeholder="Full event details shown on the event card…" value={form.fullDescription} onChange={set("fullDescription")} className={`${inputClass} resize-none`} />
            </div>

            {/* Toggles */}
            <div className="sm:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isOnline} onChange={set("isOnline")} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                <span className="text-sm font-medium text-gray-700">Online event</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFree} onChange={set("isFree")} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                <span className="text-sm font-medium text-gray-700">Free entry</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={set("featured")} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                <span className="text-sm font-medium text-gray-700">Featured event</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="flex-1 bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : "Save as Draft"}
          </button>
          <a href="/admin/events" className="px-6 py-3.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}