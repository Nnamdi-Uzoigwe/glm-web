const info = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    lines: ["14 Kingdom Avenue", "Lagos Island, Lagos", "Nigeria"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    lines: ["+234 801 234 5678", "+234 802 345 6789"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    lines: ["hello@gospellight.org", "prayer@gospellight.org"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    lines: ["Mon – Fri: 9:00 AM – 5:00 PM", "Sat: 10:00 AM – 2:00 PM"],
  },
];

const socials = [
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5 6.2a3.01 3.01 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3.01 3.01 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Info cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="font-serif text-[#1B3A6B] text-2xl mb-6">Contact Information</h2>
        <div className="space-y-6">
          {info.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1B3A6B]/8 flex items-center justify-center text-[#1B3A6B] shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div className="bg-[#1B3A6B] rounded-2xl p-8">
        <h3 className="font-serif text-white text-xl mb-2">Follow Our Ministry</h3>
        <p className="text-white/60 text-sm mb-5">
          Stay connected for sermons, updates, and encouragement.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 py-3 transition-all duration-200 group"
            >
              <span className="text-white/70 group-hover:text-white transition-colors">
                {s.icon}
              </span>
              <span className="text-sm text-white/80 group-hover:text-white font-medium transition-colors">
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}