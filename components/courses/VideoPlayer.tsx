// "use client";

// import { useEffect, useRef, useState } from "react";

// interface VideoPlayerProps {
//   lessonId: string;
//   title: string;
//   onEnded?: () => void;
// }

// export default function VideoPlayer({ lessonId, title, onEnded }: VideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // The proxy URL — never exposes Cloudinary directly
//   const proxyUrl = `/api/video/${lessonId}`;

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//   }, [lessonId]);

//   return (
//     <div className="w-full bg-black rounded-2xl overflow-hidden relative">
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
//           <div className="text-center">
//             <svg className="w-8 h-8 animate-spin text-[#C9902A] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
//             </svg>
//             <p className="text-white/60 text-xs">Loading lesson…</p>
//           </div>
//         </div>
//       )}

//       {error && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
//           <div className="text-center px-6">
//             <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//               <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//               </svg>
//             </div>
//             <p className="text-white/80 text-sm font-medium mb-1">Failed to load video</p>
//             <p className="text-white/40 text-xs">{error}</p>
//             <button
//               onClick={() => { setError(""); setLoading(true); videoRef.current?.load(); }}
//               className="mt-4 text-xs text-[#C9902A] hover:underline"
//             >
//               Try again
//             </button>
//           </div>
//         </div>
//       )}

//       <video
//         ref={videoRef}
//         className="w-full aspect-video"
//         controls
//         controlsList="nodownload" // disables the download button in browser
//         disablePictureInPicture // prevents picture-in-picture mode
//         onCanPlay={() => setLoading(false)}
//         onError={() => {
//           setLoading(false);
//           setError("Could not load this lesson. Please try again.");
//         }}
//         onEnded={onEnded}
//         title={title}
//       >
//         <source src={proxyUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  lessonId: string;
  title: string;
  onEnded?: () => void;
}

export default function VideoPlayer({ lessonId, title, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const proxyUrl = `/api/video/${lessonId}`;

  useEffect(() => {
    setLoading(true);
    setError("");
    setCompleted(false);
  }, [lessonId]);

  const handleEnded = async () => {
    try {
      const res = await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) setCompleted(true);
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
    }
    onEnded?.();
  };

  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <svg className="w-8 h-8 animate-spin text-[#C9902A] mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            <p className="text-white/60 text-xs">Loading lesson…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
          <div className="text-center px-6">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Failed to load video</p>
            <p className="text-white/40 text-xs">{error}</p>
            <button
              onClick={() => { setError(""); setLoading(true); videoRef.current?.load(); }}
              className="mt-4 text-xs text-[#C9902A] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full aspect-video"
        controls
        controlsList="nodownload"
        disablePictureInPicture
        onCanPlay={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError("Could not load this lesson. Please try again.");
        }}
        onEnded={handleEnded}
        title={title}
      >
        <source src={proxyUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Completion badge */}
      {completed && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-10">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
          Lesson Complete!
        </div>
      )}
    </div>
  );
}