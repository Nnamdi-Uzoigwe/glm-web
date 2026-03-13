const services = [
  {
    day: "Sunday",
    services: [
      { name: "First Service", time: "8:00 AM - 10:00 AM" },
      { name: "Second Service", time: "10:30 AM - 12:30 PM" },
    ],
    accent: true,
  },
  {
    day: "Wednesday",
    services: [{ name: "Midweek Bible Study", time: "6:00 PM - 8:00 PM" }],
    accent: false,
  },
  {
    day: "Friday",
    services: [{ name: "Power Hour Prayer", time: "6:00 PM - 7:30 PM" }],
    accent: false,
  },
  {
    day: "Saturday",
    services: [{ name: "Youth Fire Night", time: "5:00 PM - 9:00 PM (Monthly)" }],
    accent: false,
  },
];

export default function ServiceTimes() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Join Us
          </span>
          <h2 className="font-serif text-[#1B3A6B] text-3xl">Service Times & Location</h2>
          <div className="w-12 h-1 bg-[#C9902A] rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Schedule */}
          <div className="space-y-4">
            {services.map((item) => (
              <div
                key={item.day}
                className={`rounded-2xl p-6 border transition-all ${
                  item.accent
                    ? "bg-[#1B3A6B] border-[#1B3A6B]"
                    : "bg-white border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.accent ? "bg-white/15" : "bg-[#1B3A6B]/8"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${item.accent ? "text-[#C9902A]" : "text-[#1B3A6B]"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-serif text-lg font-semibold mb-2 ${
                        item.accent ? "text-white" : "text-[#1B3A6B]"
                      }`}
                    >
                      {item.day}
                    </p>
                    <div className="space-y-1.5">
                      {item.services.map((s) => (
                        <div key={s.name} className="flex items-center justify-between gap-4">
                          <span
                            className={`text-sm ${
                              item.accent ? "text-white/80" : "text-gray-600"
                            }`}
                          >
                            {s.name}
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                              item.accent
                                ? "bg-[#C9902A] text-white"
                                : "bg-[#1B3A6B]/8 text-[#1B3A6B]"
                            }`}
                          >
                            {s.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-400 text-center pt-1">
              All services held at 14 Kingdom Avenue, Lagos Island — unless otherwise stated.
            </p>
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="bg-[#1B3A6B] px-5 py-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C9902A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-white text-sm font-medium">Gospel Light Ministries — Lagos Island</p>
            </div>
            <iframe
              title="Gospel Light Ministries location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8997742163!2d3.3886!3d6.4531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-white px-5 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-400">14 Kingdom Avenue, Lagos Island</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1B3A6B] hover:text-[#C9902A] font-semibold transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}