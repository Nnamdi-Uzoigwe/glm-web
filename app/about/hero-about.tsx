export default function HeroAbout() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Label */}
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            About Us
          </span>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-serif text-white leading-tight mb-6">
            Who We Are
          </h1>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#C9902A] mb-6 rounded-full" />

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl">
            Gospel Light Ministries is a Spirit-filled community committed to
            carrying the light of the Gospel to every nation through evangelism,
            discipleship, and transformative ministry training.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div>
              <p className="text-3xl font-serif text-[#C9902A] font-bold">15+</p>
              <p className="text-sm text-white/60 mt-1">Years of Ministry</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-[#C9902A] font-bold">50+</p>
              <p className="text-sm text-white/60 mt-1">Nations Reached</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-[#C9902A] font-bold">200+</p>
              <p className="text-sm text-white/60 mt-1">Lives Transformed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}