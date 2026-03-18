"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const categories = ["Conference", "Outreach", "Training", "Youth", "Special"];

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "", category: "", date: "", time: "",
    location: "", isOnline: false, address: "",
    description: "", fullDescription: "", host: "",
    capacity: "100", isFree: true, featured: false, published: false,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/events/${id}`);
      if (!res.ok) { setError("Failed to load."); setLoading(false); return; }
      const data = await res.json();
      setForm({
        title: data.title,
        category: data.category,
        date: data.date,
        time: data.time,
        location: data.location,
        isOnline: data.isOnline,
        address: data.address ?? "",
        description: data.description,
        fullDescription: data.fullDescription ?? "",
        host: data.host,
        capacity: String(data.capacity),
        isFree: data.isFree,
        featured: data.featured,
        published: data.published,
      });
      setLoading(false);
    }
    load();
  }, [id]);

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
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, capacity: parseInt(form.capacity) }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "Failed"); return; }
      router.push("/admin/events");
    } catch { setError("Something went wrong."); }
    finally { setSaving(false); }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <svg className="w-8 h-8 animate-spin text-[#1B3A6B]" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Edit Event</h1>
          <p className="text-gray-400 text-sm">{form.title}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${form.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {form.published ? "Published" : "Draft"}
        </span>
      </div>

      {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">Event Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Event Title *</label>
              <input type="text" required value={form.title} onChange={set("title")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category *</label>
              <select required value={form.category} onChange={set("category")} className={inputClass}>
                <option value="">Select…</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Host / Speaker *</label>
              <input type="text" required value={form.host} onChange={set("host")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Date *</label>
              <input type="date" required value={form.date} onChange={set("date")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Time *</label>
              <input type="text" required value={form.time} onChange={set("time")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Location *</label>
              <input type="text" required value={form.location} onChange={set("location")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Capacity *</label>
              <input type="number" required min="1" value={form.capacity} onChange={set("capacity")} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Address</label>
              <input type="text" value={form.address} onChange={set("address")} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Short Description *</label>
              <input type="text" required value={form.description} onChange={set("description")} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Description</label>
              <textarea rows={5} value={form.fullDescription} onChange={set("fullDescription")} className={`${inputClass} resize-none`} />
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-6">
              {[
                { field: "isOnline", label: "Online event" },
                { field: "isFree", label: "Free entry" },
                { field: "featured", label: "Featured event" },
                { field: "published", label: "Published (visible to public)" },
              ].map(({ field, label }) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form[field as keyof typeof form] as boolean} onChange={set(field)} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="flex-1 bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Saving…
              </>
            ) : "Save Changes"}
          </button>
          <a href="/admin/events" className="px-6 py-3.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">Cancel</a>
        </div>
      </form>
    </div>
  );
}