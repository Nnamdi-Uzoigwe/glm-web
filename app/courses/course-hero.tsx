export default function CourseHero() {
  return (
    <section className="relative bg-[#1B3A6B] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
            Ministry Training
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-5">
            Courses & Ministry School
          </h1>
          <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
          <p className="text-white/70 text-lg leading-relaxed">
            Spirit-filled, gospel-centred courses designed to equip you for
            real ministry — at your own pace, from anywhere in the world.
          </p>

          <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/20">
            <div>
              <p className="text-2xl font-serif text-[#C9902A] font-bold">6+</p>
              <p className="text-xs text-white/60 mt-0.5">Courses Available</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-[#C9902A] font-bold">2,600+</p>
              <p className="text-xs text-white/60 mt-0.5">Students Enrolled</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-[#C9902A] font-bold">Self-Paced</p>
              <p className="text-xs text-white/60 mt-0.5">Learn Anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}