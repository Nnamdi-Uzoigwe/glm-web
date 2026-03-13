const leaders = [
  {
    name: "Pastor John Adeyemi",
    role: "Senior Pastor & Founder",
    bio: "A passionate evangelist with over 20 years of ministry experience, leading Gospel Light Ministries with vision and fire.",
    initials: "JA",
    color: "bg-[#1B3A6B]",
  },
  {
    name: "Pastor Sarah Adeyemi",
    role: "Co-Pastor & Women's Ministry",
    bio: "A gifted teacher and leader who shepherds the women's ministry and discipleship programs across the church.",
    initials: "SA",
    color: "bg-[#C9902A]",
  },
  {
    name: "Pastor Mike Okonkwo",
    role: "Associate Pastor",
    bio: "Overseeing outreach and evangelism operations, equipping members to carry the Gospel into their communities.",
    initials: "MO",
    color: "bg-[#1B3A6B]",
  },
  {
    name: "Pastor Grace Eze",
    role: "Youth & Young Adults",
    bio: "Passionate about raising a generation of purpose-driven young people rooted in the Word and on fire for God.",
    initials: "GE",
    color: "bg-[#C9902A]",
  },
  {
    name: "Deacon Paul Nwosu",
    role: "Head of Missions",
    bio: "Coordinating our global missionary efforts and partnerships that extend the Gospel to unreached nations.",
    initials: "PN",
    color: "bg-[#1B3A6B]",
  },
  {
    name: "Minister Ruth Babatunde",
    role: "Worship & Arts Director",
    bio: "Leading our worship ministry and creating an atmosphere where heaven meets earth every time we gather.",
    initials: "RB",
    color: "bg-[#C9902A]",
  },
];

export default function LeadershipTeam() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Meet the Team
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1B3A6B] mb-4">
            Our Leadership
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Dedicated servants of God, committed to shepherding our community
            with humility, wisdom, and love.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#1B3A6B]/20 hover:shadow-lg rounded-2xl p-6 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-full ${leader.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                >
                  {leader.initials}
                </div>
                <div>
                  <h3 className="text-[#1B3A6B] font-serif text-base font-semibold leading-snug">
                    {leader.name}
                  </h3>
                  <span className="inline-block mt-1 text-xs text-[#C9902A] font-semibold tracking-wide">
                    {leader.role}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 mb-4" />

              {/* Bio */}
              <p className="text-gray-500 text-sm leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="mt-16 bg-[#1B3A6B] rounded-2xl p-8 lg:p-12 text-center">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
            Join Us
          </span>
          <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4">
            Serve With Gospel Light
          </h3>
          <p className="text-white/65 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Are you passionate about ministry? We are always looking for
            dedicated believers to serve in various capacities within our
            growing community.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#C9902A] hover:bg-[#b57d22] text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}