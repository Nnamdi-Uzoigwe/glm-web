"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDevotionalPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    date: "",
    scripture: "",
    scriptureText: "",
    body: "",
    prayer: "",
    author: "",
    tags: "",
  });

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/devotionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save");
        return;
      }

      router.push("/admin/devotionals");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">New Devotional</h1>
        <p className="text-gray-400 text-sm">Fill in the details below and save as draft or publish directly.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">Devotional Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Title *</label>
              <input type="text" required placeholder="e.g. Walking in the Light" value={form.title} onChange={set("title")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Date *</label>
              <input type="text" required placeholder="e.g. March 18, 2026" value={form.date} onChange={set("date")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Pastor / Author *</label>
              <input type="text" required placeholder="e.g. Pastor John Adeyemi" value={form.author} onChange={set("author")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Scripture Reference *</label>
              <input type="text" required placeholder="e.g. John 8:12" value={form.scripture} onChange={set("scripture")} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Tags <span className="text-gray-300">(comma separated)</span></label>
              <input type="text" placeholder="e.g. Faith, Light, Prayer" value={form.tags} onChange={set("tags")} className={inputClass} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Scripture Text *</label>
              <textarea required rows={3} placeholder="Type the full scripture verse here…" value={form.scriptureText} onChange={set("scriptureText")} className={`${inputClass} resize-none`} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Message / Body *</label>
              <textarea required rows={8} placeholder="Write the devotional message here…" value={form.body} onChange={set("body")} className={`${inputClass} resize-none`} />
              <p className="text-xs text-gray-300 mt-1 text-right">{form.body.length} characters</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Closing Prayer *</label>
              <textarea required rows={4} placeholder="Write the closing prayer here…" value={form.prayer} onChange={set("prayer")} className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
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
          <a href="/admin/devotionals" className="px-6 py-3.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}