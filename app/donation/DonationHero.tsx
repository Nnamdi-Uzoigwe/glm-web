import { impactStats } from "@/lib/donation";

export default function DonationHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            Partner With Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
            Give to the<br />Kingdom
          </h1>
          <div className="w-14 h-1 bg-[#C9902A] rounded-full mx-auto mb-6" />
          <p className="text-white/70 text-lg leading-relaxed">
            Your generosity fuels the Gospel. Every gift — large or small —
            reaches souls, trains leaders, and transforms communities.
          </p>
          <p className="text-white/40 text-sm mt-3 italic">
            "Each of you should give what you have decided in your heart to give…
            for God loves a cheerful giver." — 2 Cor 9:7
          </p>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/15 rounded-2xl px-6 py-5 text-center"
            >
              <p className="text-3xl font-serif text-white font-bold mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}