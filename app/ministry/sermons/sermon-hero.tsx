export default function SermonHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
          Gospel Ministry
        </span>
        <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
          Sermons
        </h1>
        <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
        <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          Gospel-rich, Spirit-filled messages to feed your faith — free for
          every believer, anytime, anywhere.
        </p>
      </div>
    </section>
  );
}