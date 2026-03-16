"use client";

import { useState } from "react";
import {
  donationCategories,
  suggestedAmounts,
  DonationFrequency,
  DonationCategory,
} from "@/lib/donation";

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>${raised.toLocaleString()} raised</span>
        <span>{pct}% of ${goal.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C9902A] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  selected,
  onSelect,
}: {
  cat: DonationCategory;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? "border-[#1B3A6B] bg-[#1B3A6B]/5 ring-2 ring-[#1B3A6B]/20"
          : "border-gray-100 bg-white hover:border-[#1B3A6B]/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{cat.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${selected ? "text-[#1B3A6B]" : "text-gray-800"}`}>
            {cat.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
            {cat.description}
          </p>
          {cat.goal && cat.raised !== undefined && (
            <ProgressBar raised={cat.raised} goal={cat.goal} />
          )}
        </div>
        <div
          className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all ${
            selected ? "border-[#1B3A6B] bg-[#1B3A6B]" : "border-gray-300"
          }`}
        >
          {selected && (
            <svg className="w-full h-full text-white" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 11.5L3 8l1-1 2.5 2.5 5-5 1 1z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function DonationForm() {
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cardForm, setCardForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount ?? 0;

  const category = donationCategories.find((c) => c.id === selectedCategory)!;

  const frequencyLabel: Record<DonationFrequency, string> = {
    "one-time": "One-Time Gift",
    monthly: "Monthly",
    annually: "Annually",
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const setCard = (f: keyof typeof cardForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCardForm((p) => ({ ...p, [f]: e.target.value }));

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";

  // ── Step indicators ──
  const steps = ["Choose Amount", "Select Fund", "Payment"];

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-20 h-20 bg-[#1B3A6B]/8 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🙏</span>
        </div>
        <h3 className="font-serif text-[#1B3A6B] text-3xl mb-2">Thank You!</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-2">
          Your {frequencyLabel[frequency].toLowerCase()} gift of{" "}
          <span className="font-bold text-[#C9902A] text-base">${finalAmount}</span> to{" "}
          <span className="font-semibold text-gray-700">{category.title}</span> has been received.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          A receipt will be sent to <span className="font-semibold">{cardForm.email}</span>
        </p>
        <p className="text-[#1B3A6B]/60 text-xs italic mb-6">
          "Well done, good and faithful servant." — Matthew 25:21
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setCardForm({ name: "", email: "", card: "", expiry: "", cvv: "" });
          }}
          className="text-sm text-[#1B3A6B] hover:text-[#C9902A] font-semibold underline underline-offset-4 transition-colors"
        >
          Give again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Step header */}
      <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {steps.map((s, i) => {
            const idx = i + 1;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    done
                      ? "bg-[#C9902A] text-white"
                      : active
                      ? "bg-[#1B3A6B] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {done ? "✓" : idx}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    active ? "text-[#1B3A6B]" : done ? "text-[#C9902A]" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${done ? "bg-[#C9902A]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {/* ── STEP 1: Amount ── */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Choose an Amount</h2>
            <p className="text-gray-400 text-sm mb-6">Every gift makes an eternal difference.</p>

            {/* Frequency */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {(["one-time", "monthly", "annually"] as DonationFrequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    frequency === f
                      ? "bg-[#1B3A6B] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {frequencyLabel[f]}
                </button>
              ))}
            </div>

            {/* Suggested amounts */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`py-3 rounded-xl font-semibold text-sm border transition-all duration-200 ${
                    selectedAmount === amt && !customAmount
                      ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#1B3A6B]/40"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">$</span>
              <input
                type="number"
                min="1"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className={`${inputClass} pl-8`}
              />
            </div>

            {/* Summary */}
            {finalAmount > 0 && (
              <div className="bg-[#1B3A6B]/5 border border-[#1B3A6B]/15 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Your gift</p>
                  <p className="font-serif text-[#1B3A6B] text-xl font-bold">
                    ${finalAmount}
                    {frequency !== "one-time" && (
                      <span className="text-sm font-normal text-gray-400 ml-1">/ {frequency === "monthly" ? "mo" : "yr"}</span>
                    )}
                  </p>
                </div>
                <span className="text-xs bg-[#C9902A]/15 text-[#C9902A] font-semibold px-3 py-1 rounded-full">
                  {frequencyLabel[frequency]}
                </span>
              </div>
            )}

            <button
              type="button"
              disabled={finalAmount <= 0}
              onClick={() => setStep(2)}
              className="w-full bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2: Fund ── */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Select a Fund</h2>
            <p className="text-gray-400 text-sm mb-6">Where would you like your gift to go?</p>

            <div className="space-y-3 mb-8 max-h-100 overflow-y-auto pr-1">
              {donationCategories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  selected={selectedCategory === cat.id}
                  onSelect={() => setSelectedCategory(cat.id)}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-500 hover:border-[#1B3A6B]/40 font-semibold py-3.5 rounded-xl transition-all duration-200"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-2 bg-[#1B3A6B] hover:bg-[#C9902A] text-white font-semibold py-3.5 rounded-xl transition-all duration-300"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <form onSubmit={handlePay}>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Payment Details</h2>
            <p className="text-gray-400 text-sm mb-6">Secure and encrypted. We never store card data.</p>

            {/* Gift summary */}
            <div className="bg-gray-50 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Giving to</p>
                <p className="text-sm font-semibold text-[#1B3A6B]">{category.icon} {category.title}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{frequencyLabel[frequency]}</p>
                <p className="font-serif text-[#C9902A] text-xl font-bold">${finalAmount}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input type="text" placeholder="John Adeyemi" required value={cardForm.name} onChange={setCard("name")} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input type="email" placeholder="john@example.com" required value={cardForm.email} onChange={setCard("email")} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={cardForm.card}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      const spaced = v.replace(/(.{4})/g, "$1 ").trim();
                      setCardForm((p) => ({ ...p, card: spaced }));
                    }}
                    className={`${inputClass} pr-12`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg">💳</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    required
                    maxLength={7}
                    value={cardForm.expiry}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      const fmt = v.length > 2 ? `${v.slice(0, 2)} / ${v.slice(2)}` : v;
                      setCardForm((p) => ({ ...p, expiry: fmt }));
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    required
                    maxLength={4}
                    value={cardForm.cvv}
                    onChange={setCard("cvv")}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 text-gray-500 hover:border-[#1B3A6B]/40 font-semibold py-3.5 rounded-xl transition-all duration-200"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 bg-[#C9902A] hover:bg-[#b57d22] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  `Give $${finalAmount} 🙏`
                )}
              </button>
            </div>

            <p className="text-xs text-gray-300 text-center mt-4 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              256-bit SSL encrypted · We never store card details
            </p>
          </form>
        )}
      </div>
    </div>
  );
}