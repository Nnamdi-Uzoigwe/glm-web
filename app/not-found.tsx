import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 bg-[#1B3A6B]/8 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-[#1B3A6B]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* 404 */}
        <p className="text-8xl font-serif text-[#1B3A6B] font-bold leading-none mb-2">404</p>
        <div className="w-12 h-1 bg-[#C9902A] rounded-full mx-auto mb-6" />

        <h1 className="font-serif text-[#1B3A6B] text-2xl mb-3">Page Not Found</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#1B3A6B] hover:bg-[#C9902A] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto border border-gray-200 hover:border-[#1B3A6B]/30 text-gray-500 hover:text-[#1B3A6B] font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            Browse Courses
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Or try one of these</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "About", href: "/about" },
              { label: "Ministry", href: "/ministry" },
              { label: "Events", href: "/events" },
              { label: "Give", href: "/give" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-[#1B3A6B] hover:text-[#C9902A] font-medium px-3 py-1.5 bg-[#1B3A6B]/5 hover:bg-[#C9902A]/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}