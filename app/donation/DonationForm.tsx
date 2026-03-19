"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const donationCategories = [
  { id: "general", title: "General Fund", icon: "🏛️" },
  { id: "missions", title: "Missions & Outreach", icon: "🌍" },
  { id: "building", title: "Building Fund", icon: "🏗️" },
  { id: "youth", title: "Youth Ministry", icon: "⚡" },
  { id: "media", title: "Media & Technology", icon: "📡" },
  { id: "welfare", title: "Welfare & Care", icon: "🤝" },
];

const suggestedAmounts = [1000, 2500, 5000, 10000, 25000, 50000];
type Frequency = "one-time" | "monthly" | "annually";

export default function DonationForm() {
  const searchParams = useSearchParams();
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cardForm, setCardForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failed" | null>(null);

  useEffect(() => {
    const status = searchParams.get("payment");
    if (status === "success") setPaymentStatus("success");
    if (status === "failed") setPaymentStatus("failed");
  }, [searchParams]);

  // const finalAmount = customAmount ? Math.round(parseFloat(customAmount) * 100) : (selectedAmount ?? 0);
  const finalAmountKobo = customAmount 
  ? Math.round(parseFloat(customAmount) * 100) 
  : (selectedAmount ?? 0) * 100;

const displayAmount = (selectedAmount ?? 0) || parseFloat(customAmount || "0");
  // const displayAmount = finalAmount / 100;
  const category = donationCategories.find((c) => c.id === selectedCategory)!;

  const frequencyLabel: Record<Frequency, string> = {
    "one-time": "One-Time Gift",
    monthly: "Monthly",
    annually: "Annually",
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/donations/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cardForm.name,
          email: cardForm.email,
          amount: finalAmountKobo,
          frequency,
          fund: category.title,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to initialize payment"); return; }

      window.location.href = data.authorizationUrl;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";
  const steps = ["Choose Amount", "Select Fund", "Payment"];

  if (paymentStatus === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-20 h-20 bg-[#1B3A6B]/8 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🙏</span>
        </div>
        <h3 className="font-serif text-[#1B3A6B] text-3xl mb-2">Thank You!</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
          Your gift has been received. A receipt will be sent to your email address.
        </p>
        <p className="text-[#1B3A6B]/60 text-xs italic mb-6">"Well done, good and faithful servant." — Matthew 25:21</p>
        <button onClick={() => { setPaymentStatus(null); setStep(1); setCardForm({ name: "", email: "" }); }}
          className="text-sm text-[#1B3A6B] hover:text-[#C9902A] font-semibold underline underline-offset-4 transition-colors">
          Give again
        </button>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="font-serif text-[#1B3A6B] text-2xl mb-2">Payment Failed</h3>
        <p className="text-gray-500 text-sm mb-6">Something went wrong with your payment. Please try again.</p>
        <button onClick={() => setPaymentStatus(null)}
          className="bg-[#1B3A6B] hover:bg-[#C9902A] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
          Try Again
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
            const idx = (i + 1) as 1 | 2 | 3;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-[#C9902A] text-white" : active ? "bg-[#1B3A6B] text-white" : "bg-gray-200 text-gray-400"}`}>
                  {done ? "✓" : idx}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${active ? "text-[#1B3A6B]" : done ? "text-[#C9902A]" : "text-gray-400"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px mx-1 ${done ? "bg-[#C9902A]" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Choose an Amount</h2>
            <p className="text-gray-400 text-sm mb-6">Every gift makes an eternal difference.</p>

            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {(["one-time", "monthly", "annually"] as Frequency[]).map((f) => (
                <button key={f} type="button" onClick={() => setFrequency(f)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${frequency === f ? "bg-[#1B3A6B] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {frequencyLabel[f]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {suggestedAmounts.map((amt) => (
                <button key={amt} type="button" onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`py-3 rounded-xl font-semibold text-sm border transition-all duration-200 ${selectedAmount === amt && !customAmount ? "bg-[#1B3A6B] text-white border-[#1B3A6B]" : "bg-white text-gray-700 border-gray-200 hover:border-[#1B3A6B]/40"}`}>
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="relative mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">₦</span>
              <input type="number" min="100" placeholder="Enter custom amount" value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className={`${inputClass} pl-8`} />
            </div>

            {finalAmountKobo > 0 && (
              <div className="bg-[#1B3A6B]/5 border border-[#1B3A6B]/15 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Your gift</p>
                  <p className="font-serif text-[#1B3A6B] text-xl font-bold">
                    ₦{displayAmount.toLocaleString()}
                    {frequency !== "one-time" && <span className="text-sm font-normal text-gray-400 ml-1">/ {frequency === "monthly" ? "mo" : "yr"}</span>}
                  </p>
                </div>
                <span className="text-xs bg-[#C9902A]/15 text-[#C9902A] font-semibold px-3 py-1 rounded-full">{frequencyLabel[frequency]}</span>
              </div>
            )}

            <button type="button" disabled={finalAmountKobo <= 0} onClick={() => setStep(2)}
              className="w-full bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl transition-all duration-300">
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Select a Fund</h2>
            <p className="text-gray-400 text-sm mb-6">Where would you like your gift to go?</p>
            <div className="space-y-3 mb-8 max-h-100 overflow-y-auto pr-1">
              {donationCategories.map((cat) => (
                <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center gap-3 ${selectedCategory === cat.id ? "border-[#1B3A6B] bg-[#1B3A6B]/5 ring-2 ring-[#1B3A6B]/20" : "border-gray-100 bg-white hover:border-[#1B3A6B]/30"}`}>
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-sm font-semibold ${selectedCategory === cat.id ? "text-[#1B3A6B]" : "text-gray-800"}`}>{cat.title}</span>
                  {selectedCategory === cat.id && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[#1B3A6B] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6l3 3 5-5"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-500 hover:border-[#1B3A6B]/40 font-semibold py-3.5 rounded-xl transition-all duration-200">← Back</button>
              <button type="button" onClick={() => setStep(3)} className="flex-2 bg-[#1B3A6B] hover:bg-[#C9902A] text-white font-semibold py-3.5 rounded-xl transition-all duration-300">Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={handlePay}>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-1">Payment Details</h2>
            <p className="text-gray-400 text-sm mb-6">Secure and encrypted via Paystack.</p>

            <div className="bg-gray-50 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Giving to</p>
                <p className="text-sm font-semibold text-[#1B3A6B]">{category.icon} {category.title}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{frequencyLabel[frequency]}</p>
                <p className="font-serif text-[#C9902A] text-xl font-bold">₦{displayAmount.toLocaleString()}</p>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                <input type="text" placeholder="John Adeyemi" required value={cardForm.name} onChange={(e) => setCardForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Email Address</label>
                <input type="email" placeholder="john@example.com" required value={cardForm.email} onChange={(e) => setCardForm((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3.5 rounded-xl transition-all duration-200">← Back</button>
              <button type="submit" disabled={loading} className="flex-2bg-[#C9902A] bg-[#b57d22] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center text-sm px-4 justify-center gap-2">
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Processing…</>
                ) : `Donate ₦${displayAmount.toLocaleString()}`}
              </button>
            </div>
            <p className="text-xs text-gray-300 text-center mt-4 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Secured by Paystack · 256-bit SSL
            </p>
          </form>
        )}
      </div>
    </div>
  );
}