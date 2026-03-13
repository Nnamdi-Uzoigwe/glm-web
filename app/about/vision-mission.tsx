const values = [
  {
    title: "Prayer",
    description:
      "We believe prayer is the foundation of all ministry. We are a house of prayer that seeks God's face continually.",
    icon: "🙏",
  },
  {
    title: "Evangelism",
    description:
      "Sharing the Good News of Jesus Christ is at the heart of everything we do — locally and globally.",
    icon: "🌍",
  },
  {
    title: "Discipleship",
    description:
      "We are committed to making mature disciples who are rooted in God's Word and equipped to serve.",
    icon: "📖",
  },
  {
    title: "Community",
    description:
      "We foster a warm, welcoming family where every believer is known, loved, and empowered to flourish.",
    icon: "🤝",
  },
];

export default function VisionMission() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="relative bg-[#1B3A6B] rounded-2xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
              Our Vision
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-white leading-snug mb-4">
              A world transformed by the Gospel of Jesus Christ
            </h2>
            <p className="text-white/65 text-sm leading-relaxed">
              We envision communities, cities, and nations encountering the
              living God through Spirit-empowered ministry that brings lasting
              transformation to every sphere of society.
            </p>
            <div className="mt-6 w-10 h-1 bg-[#C9902A] rounded-full" />
          </div>

          {/* Mission */}
          <div className="relative border-2 border-[#1B3A6B] rounded-2xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[#1B3A6B]/5 translate-x-1/3 translate-y-1/3" />
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
              Our Mission
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B] leading-snug mb-4">
              Equipping believers to reach, teach, and disciple nations
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Through gospel-centred preaching, practical ministry training,
              and Spirit-led outreach, we raise up a generation of believers
              who carry the light of Christ to their homes, cities, and the
              ends of the earth.
            </p>
            <div className="mt-6 w-10 h-1 bg-[#C9902A] rounded-full" />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            What We Stand For
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1B3A6B]">
            Our Core Values
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="group bg-gray-50 hover:bg-[#1B3A6B] rounded-xl p-6 transition-all duration-300 border border-gray-100 hover:border-[#1B3A6B]"
            >
              <span className="text-3xl block mb-4">{value.icon}</span>
              <h3 className="text-lg font-serif text-[#1B3A6B] group-hover:text-white font-semibold mb-2 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-white/70 leading-relaxed transition-colors duration-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}