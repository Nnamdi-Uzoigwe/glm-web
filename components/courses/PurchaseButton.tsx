"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PurchaseButtonProps {
  courseId: string;
  courseTitle: string;
  price: number;
  isLoggedIn: boolean;
}

export default function PurchaseButton({
  courseId,
  courseTitle,
  price,
  isLoggedIn,
}: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      router.push(`/sign-in?callbackUrl=/courses`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to initialize payment");
        return;
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorizationUrl;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
      )}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-[#C9902A] hover:bg-[#b57d22] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Redirecting to payment…
          </>
        ) : isLoggedIn ? (
          `Enrol Now — ₦${(price / 100).toLocaleString()}`
        ) : (
          "Sign In to Enrol"
        )}
      </button>
      {!isLoggedIn && (
        <p className="text-xs text-gray-400 text-center mt-2">
          You need an account to purchase this course
        </p>
      )}
    </div>
  );
}