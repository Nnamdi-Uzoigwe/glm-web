export default function ContactHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 text-center">
        <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
          Get In Touch
        </span>
        <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
          We'd Love to<br />Hear From You
        </h1>
        <div className="w-14 h-1 bg-[#C9902A] rounded-full mx-auto mb-6" />
        <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
          Whether you have a question, a prayer request, or simply want to
          connect — our doors and hearts are open. Reach out anytime.
        </p>
      </div>
    </section>
  );
}