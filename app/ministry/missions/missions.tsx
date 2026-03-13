import { missions, missionPartners } from "@/lib/ministry";
import Link from "next/link";

// ─── HERO ─────────────────────────────────────────────────────────────────────

export function MissionsHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-2xl mb-12">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            Global Outreach
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
            Missions
          </h1>
          <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
          <p className="text-white/70 text-lg leading-relaxed">
            We exist to carry the Gospel to every nation, tribe, and tongue.
            Join us in taking the light to the ends of the earth.
          </p>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "20+", label: "Nations Reached" },
            { value: "1,000+", label: "Souls Won" },
            { value: "4", label: "Active Missions" },
            { value: "$47K+", label: "Mission Funds" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-serif text-[#C9902A] font-bold">{stat.value}</p>
              <p className="text-xs text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MISSIONS GRID ────────────────────────────────────────────────────────────

export function MissionsGrid() {
  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Upcoming: "bg-amber-100 text-amber-700",
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Active & Upcoming
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B]">
            Mission Fields
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {missions.map((mission) => {
            const progress = Math.min(Math.round((mission.raised / mission.goal) * 100), 100);
            return (
              <div
                key={mission.id}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-lg rounded-2xl p-6 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {mission.missionaryInitials}
                    </div>
                    <div>
                      <h3 className="font-serif text-[#1B3A6B] text-lg leading-snug group-hover:text-[#C9902A] transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {mission.location} • {mission.region}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusColors[mission.status]}`}>
                    {mission.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {mission.description}
                </p>

                {/* Impact stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {mission.impactStats.map((stat) => (
                    <div key={stat.label} className="text-center bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-lg font-serif text-[#C9902A] font-bold">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Funding progress */}
                {mission.status !== "Completed" && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Raised: <span className="font-semibold text-[#1B3A6B]">${mission.raised.toLocaleString()}</span></span>
                      <span>Goal: <span className="font-semibold">${mission.goal.toLocaleString()}</span></span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#C9902A] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{progress}% funded</p>
                  </div>
                )}

                {mission.status === "Completed" && (
                  <div className="bg-blue-50 rounded-xl px-4 py-2 text-center">
                    <p className="text-xs font-semibold text-blue-700">Mission Fully Funded & Completed</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Led by <span className="font-semibold text-[#1B3A6B]">{mission.missionaryName}</span>
                  </p>
                  <Link
                    href="/give"
                    className="text-xs font-semibold text-[#C9902A] hover:text-[#b57d22] transition-colors"
                  >
                    Support This Mission →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── MISSION PARTNERS ─────────────────────────────────────────────────────────

export function MissionsPartners() {
  return (
    <section className="bg-gray-50 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Collaboration
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] mb-3">
            Mission Partners
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            We work alongside trusted global organisations to multiply our
            reach and impact for the Kingdom.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {missionPartners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:shadow-md hover:border-[#1B3A6B]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                {partner.initials}
              </div>
              <p className="font-serif text-[#1B3A6B] text-sm font-semibold">{partner.name}</p>
              <p className="text-xs text-gray-400 mt-1">{partner.region}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#1B3A6B] rounded-2xl p-8 lg:p-12 text-center">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Get Involved
          </span>
          <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4">
            Partner With Our Missions
          </h3>
          <p className="text-white/65 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Every gift, prayer, and partnership helps carry the Gospel further.
            Join us in changing nations for Christ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/give"
              className="bg-[#C9902A] hover:bg-[#b57d22] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Give to Missions
            </Link>
            <Link
              href="/contact"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Become a Mission Partner →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}