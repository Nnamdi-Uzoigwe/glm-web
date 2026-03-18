// import { DevotionalArchive, DevotionalHero, TodaysDevotional } from "./devotionals";

// export default function Devotionals() {
//     return (
//         <div>
//             <DevotionalHero />
//             <TodaysDevotional />
//             <DevotionalArchive />
//         </div>
//     )
// }


import { db } from "@/db";
import { devotionals } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function DevotionalsPage() {
  const all = await db
    .select()
    .from(devotionals)
    .where(eq(devotionals.published, true))
    .orderBy(desc(devotionals.createdAt));

  const today = all[0];
  const archive = all.slice(1);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#1B3A6B] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C9902A] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-4">
              Daily Devotional
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">Devotionals</h1>
            <div className="w-14 h-1 bg-[#C9902A] rounded-full mb-5" />
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Daily scripture, reflection, and prayer to anchor your heart in God's Word — free for every believer.
            </p>
            {today && (
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 inline-block">
                <p className="text-xs text-[#C9902A] font-semibold uppercase tracking-wider mb-1">Latest Scripture</p>
                <p className="text-white font-serif text-base">{today.scripture}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest devotional */}
      {today ? (
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="inline-block text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-3">
                {today.date}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif text-[#1B3A6B]">{today.title}</h2>
            </div>

            {/* Scripture block */}
            <div className="bg-[#1B3A6B] rounded-2xl p-7 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
              <p className="text-[#C9902A] text-xs font-semibold uppercase tracking-widest mb-3">{today.scripture}</p>
              <p className="text-white font-serif text-lg leading-relaxed italic">"{today.scriptureText}"</p>
            </div>

            {/* Body */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg whitespace-pre-line">{today.body}</p>
            </div>

            {/* Prayer */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#C9902A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-xs font-semibold text-[#C9902A] uppercase tracking-wider">Prayer</p>
              </div>
              <p className="text-gray-600 italic text-sm leading-relaxed">{today.prayer}</p>
            </div>

            {/* Author + tags */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold">
                  {today.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B3A6B]">{today.author}</p>
                  <p className="text-xs text-gray-400">Gospel Light Ministries</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(today.tags ?? []).map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-4xl mb-4">📖</p>
            <h2 className="font-serif text-[#1B3A6B] text-2xl mb-2">No devotionals yet</h2>
            <p className="text-gray-400 text-sm">Check back soon — new devotionals are added regularly.</p>
          </div>
        </section>
      )}

      {/* Archive */}
      {archive.length > 0 && (
        <section className="bg-gray-50 py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-[#C9902A] text-xs font-semibold tracking-[3px] uppercase mb-2 block">Archive</span>
              <h2 className="text-2xl lg:text-3xl font-serif text-[#1B3A6B]">Previous Devotionals</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {archive.map((dev) => (
                <div key={dev.id} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#1B3A6B]/20 transition-all duration-300">
                  <p className="text-xs text-[#C9902A] font-semibold uppercase tracking-wide mb-1">{dev.date}</p>
                  <h3 className="font-serif text-[#1B3A6B] text-lg leading-snug mb-2 group-hover:text-[#C9902A] transition-colors">{dev.title}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">{dev.scripture}</p>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">{dev.body}</p>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold">
                        {dev.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <p className="text-xs text-gray-500">{dev.author}</p>
                    </div>
                    <div className="flex gap-1">
                      {(dev.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}