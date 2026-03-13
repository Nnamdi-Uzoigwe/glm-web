"use client";

import { useState } from "react";
import { Sermon } from "@/lib/ministry";

interface SermonPlayerProps {
  sermon: Sermon;
  onClose: () => void;
}

function SermonPlayer({ sermon, onClose }: SermonPlayerProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1`}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute inset-0"
          />
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#C9902A] tracking-wide uppercase">
                {sermon.series}
              </span>
              <h3 className="text-xl font-serif text-[#1B3A6B] mt-1 mb-2">
                {sermon.title}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span>{sermon.speaker}</span>
                <span>•</span>
                <span>{sermon.date}</span>
                <span>•</span>
                <span>{sermon.duration}</span>
                <span>•</span>
                <span className="text-[#C9902A] font-medium">{sermon.scripture}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mt-3">
            {sermon.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Sermon Card

interface SermonCardProps {
  sermon: Sermon;
  onPlay: (sermon: Sermon) => void;
}

function SermonCard({ sermon, onPlay }: SermonCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#1B3A6B]/20 transition-all duration-300">
      {/* Thumbnail */}
      <div
        className="relative bg-[#1B3A6B] h-44 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onPlay(sermon)}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
        </div>
        {/* Play button */}
        <div className="relative w-14 h-14 rounded-full bg-white/20 hover:bg-[#C9902A] border-2 border-white/50 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
          {sermon.duration}
        </div>
        <div className="absolute top-3 left-3 bg-[#C9902A] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
          Free
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="text-xs font-semibold text-[#C9902A] tracking-wide uppercase">
          {sermon.series}
        </span>
        <h3 className="font-serif text-[#1B3A6B] text-lg leading-snug mt-1 mb-2 group-hover:text-[#C9902A] transition-colors">
          {sermon.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{sermon.description}</p>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold">
              {sermon.speaker.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">{sermon.speaker}</p>
              <p className="text-xs text-gray-400">{sermon.date}</p>
            </div>
          </div>
          <button
            onClick={() => onPlay(sermon)}
            className="text-xs text-[#1B3A6B] font-semibold hover:text-[#C9902A] transition-colors"
          >
            Watch →
          </button>
        </div>
      </div>
    </div>
  );
}

// Sermon Grid

interface SermonGridProps {
  sermons: Sermon[];
}

export default function SermonGrid({ sermons }: SermonGridProps) {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  if (sermons.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm">No sermons found. Try a different filter.</p>
      </div>
    );
  }

  return (
    <>
      {playing && (
        <SermonPlayer sermon={playing} onClose={() => setPlaying(null)} />
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon) => (
          <SermonCard key={sermon.id} sermon={sermon} onPlay={setPlaying} />
        ))}
      </div>
    </>
  );
}