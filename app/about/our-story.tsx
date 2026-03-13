const milestones = [
  {
    year: "2008",
    title: "The Beginning",
    description:
      "Gospel Light Ministries was founded by a small group of believers with a burning desire to spread the Gospel beyond church walls.",
  },
  {
    year: "2012",
    title: "First Outreach Campaign",
    description:
      "We launched our first major city-wide evangelism campaign, reaching over 5,000 people with the message of salvation.",
  },
  {
    year: "2016",
    title: "Ministry School Launched",
    description:
      "The Gospel Light Ministry School opened its doors, equipping the next generation of leaders with biblical training.",
  },
  {
    year: "2020",
    title: "Going Global",
    description:
      "Expanded our reach to 20+ nations through online courses, missionary partnerships, and gospel outreach programs.",
  },
  {
    year: "2024",
    title: "Today & Beyond",
    description:
      "Continuing to grow, train, and send believers into every corner of the earth with the light of the Gospel.",
  },
];

export default function OurStory() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
              Our Story
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif text-[#1B3A6B] leading-tight mb-6">
              From a small gathering to a global light
            </h2>
            <div className="w-16 h-1 bg-[#C9902A] rounded-full mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4">
              What began as a handful of passionate believers meeting in a living
              room has grown into a thriving ministry that touches lives across
              continents. Our journey is a testament to God's faithfulness.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Every step of the way, we have been guided by one simple truth —
              the Gospel is the power of God unto salvation for everyone who
              believes. That conviction has never changed, and it never will.
            </p>
          </div>

          {/* Featured quote */}
          <div className="relative">
            <div className="bg-[#1B3A6B] rounded-2xl p-8 lg:p-10">
              <span className="text-[#C9902A] text-6xl font-serif leading-none">"</span>
              <p className="text-white text-lg lg:text-xl font-serif leading-relaxed mt-2 mb-6">
                We exist to shine the light of Christ in every dark corner of
                the world — until every soul has heard His name.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9902A] flex items-center justify-center text-white text-sm font-bold">
                  GL
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Founder</p>
                  <p className="text-white/60 text-xs">Gospel Light Ministries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Our Journey
          </span>
          <h3 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B]">
            Milestones of Grace
          </h3>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[#1B3A6B]/20 lg:-translate-x-px" />

          <div className="space-y-10">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-start gap-8 lg:gap-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-[#C9902A] border-2 border-white shadow lg:-translate-x-1.5 mt-1.5" />

                {/* Content */}
                <div
                  className={`pl-12 lg:pl-0 lg:w-1/2 ${
                    index % 2 === 0
                      ? "lg:pr-12 lg:text-right"
                      : "lg:pl-12 lg:text-left"
                  }`}
                >
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm inline-block w-full">
                    <span className="text-[#C9902A] text-sm font-bold tracking-wider">
                      {milestone.year}
                    </span>
                    <h4 className="text-[#1B3A6B] font-serif text-lg mt-1 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}