import Link from "next/link";
import { sermons } from "@/lib/ministry";

export default function FeaturedSermon() {
  const featured = sermons[0];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
              Latest Message
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B]">
              Featured Sermon
            </h2>
          </div>
          <Link
            href="/ministry/sermons"
            className="text-sm text-[#1B3A6B] font-semibold hover:text-[#C9902A] transition-colors hidden sm:block"
          >
            All Sermons →
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Video embed */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${featured.youtubeId}`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-semibold text-[#C9902A] tracking-wide uppercase mb-3">
              {featured.series}
            </span>
            <h3 className="text-2xl font-serif text-[#1B3A6B] leading-snug mb-3">
              {featured.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold">
                  {featured.speaker.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                {featured.speaker}
              </span>
              <span>•</span>
              <span>{featured.date}</span>
              <span>•</span>
              <span>{featured.duration}</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-l-4 border-[#C9902A]">
              <p className="text-xs text-[#C9902A] font-semibold mb-1">Scripture</p>
              <p className="text-sm text-[#1B3A6B] font-serif">{featured.scripture}</p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {featured.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent sermons strip */}
        <div className="mt-12 pt-10 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
            More Recent Messages
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sermons.slice(1, 4).map((sermon) => (
              <Link
                key={sermon.id}
                href="/ministry/sermons"
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
              >
                <div className="w-10 h-10 bg-[#1B3A6B] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#C9902A] transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1B3A6B] group-hover:text-[#C9902A] truncate transition-colors">
                    {sermon.title}
                  </p>
                  <p className="text-xs text-gray-400">{sermon.date} • {sermon.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}