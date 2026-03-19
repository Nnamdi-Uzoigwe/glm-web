"use client";

import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

export default function AdminMobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden flex flex-col gap-1.5 p-2 text-white/60 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Desktop nav row */}
      <div className="hidden sm:flex items-center gap-1 overflow-x-auto pb-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-white/60 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all shrink-0"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-[#1B3A6B] border-t border-white/10 z-50 shadow-xl">
          <div className="px-4 py-3 grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-lg text-sm transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}