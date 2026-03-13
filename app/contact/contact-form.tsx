"use client";

import { useState } from "react";

const subjects = [
  "General Enquiry",
  "Prayer Request",
  "Ministry Partnership",
  "Courses & Training",
  "Events",
  "Media & Press",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate request
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200 bg-white";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-[#1B3A6B] text-2xl mb-2">Message Sent!</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            Thank you, <span className="font-semibold text-gray-700">{form.name}</span>. We'll
            get back to you at <span className="font-semibold text-gray-700">{form.email}</span>{" "}
            within 24–48 hours.
          </p>
          <button
            onClick={() => { setForm(empty); setSubmitted(false); }}
            className="text-sm text-[#1B3A6B] hover:text-[#C9902A] font-semibold underline underline-offset-4 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Send Us a Message</h2>
            <p className="text-gray-400 text-sm">We read every message and respond personally.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Adeyemi"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={set("email")}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Phone <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={set("subject")}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>Select a subject…</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help or pray for you…"
                required
                value={form.message}
                onChange={set("message")}
                className={`${inputClass} resize-none`}
              />
              <p className="text-xs text-gray-300 mt-1 text-right">{form.message.length} / 1000</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message →"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}