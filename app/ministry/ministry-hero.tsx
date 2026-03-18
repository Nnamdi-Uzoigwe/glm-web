import Link from "next/link";

const ministryLinks = [
  {
    title: "Devotionals",
    description: "Daily scripture & reflections",
    href: "/ministry/devotionals",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Prayer Wall",
    description: "Share & pray for one another",
    href: "/ministry/prayer",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "bg-rose-50 text-rose-600",
  }
];

export default function MinistryHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            Gospel Ministry
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-5">
            Rooted in the Word,<br />Moved by the Spirit
          </h1>
          <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
          <p className="text-white/70 text-lg leading-relaxed">
            Free gospel content for every believer — sermons, devotionals,
            prayer, and missions, all in one place.
          </p>
        </div>

        {/* Nav cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ministryLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group bg-white/10 hover:bg-white rounded-xl p-5 border border-white/20 hover:border-transparent transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-lg ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {link.icon}
              </div>
              <h3 className="font-serif text-white group-hover:text-[#1B3A6B] text-lg mb-1 transition-colors duration-300">
                {link.title}
              </h3>
              <p className="text-white/60 group-hover:text-gray-500 text-xs leading-relaxed transition-colors duration-300">
                {link.description}
              </p>
              <span className="inline-block mt-3 text-xs text-[#C9902A] group-hover:text-[#C9902A] font-semibold">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}