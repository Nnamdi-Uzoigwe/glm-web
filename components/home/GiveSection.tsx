import Link from "next/link";

export default function GiveSection() {
  return (
    <section className="relative bg-[#1B3A6B] py-24 px-8 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(201,144,42,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#f0c97a] mb-4">
          Make a Difference
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Partner with Us to{" "}
          <em className="italic text-[#f0c97a]">Spread the Light</em>
        </h2>
        <p className="text-white/60 text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Your generous giving fuels gospel outreach, funds ministry courses, and sends
          missionaries to unreached communities. Every gift makes an eternal impact.
        </p>
        <Link
          href="/donation"
          className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#C9902A] to-[#e0a83a] text-white font-bold text-base rounded-xl shadow-lg shadow-[#C9902A]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C9902A]/40 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Give Now
        </Link>
      </div>
    </section>
  );
}