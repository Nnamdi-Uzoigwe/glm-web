"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/"},
  { label: "About", href: "/about" },
  {
    label: "Ministry",
    href: "/ministry",
    children: [
      { label: "Sermons", href: "/ministry/sermons" },
      { label: "Devotionals", href: "/ministry/devotionals" },
      { label: "Prayer Wall", href: "/ministry/prayer" },
      { label: "Missions", href: "/ministry/missions" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(27,58,107,0.08), 0 4px 24px rgba(27,58,107,0.06);
        }
        .navbar.top {
          background: transparent;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #1B3A6B, #2a5298);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1B3A6B;
          line-height: 1.1;
        }
        .logo-text span {
          display: block;
          font-size: 0.7rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9902A;
        }
        .navbar.top .logo-text { color: #fff; }
        .navbar.top .logo-text span { color: #f0c97a; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-item { position: relative; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.5rem 0.875rem;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #1B3A6B;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar.top .nav-link { color: rgba(255,255,255,0.9); }
        .nav-link:hover { background: rgba(27,58,107,0.07); color: #1B3A6B; }
        .navbar.top .nav-link:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .nav-chevron {
          width: 14px; height: 14px;
          transition: transform 0.2s;
        }
        .nav-item:hover .nav-chevron { transform: rotate(180deg); }

        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 40px rgba(27,58,107,0.14);
          padding: 0.5rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          border: 1px solid rgba(27,58,107,0.06);
        }
        .nav-item:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-link {
          display: block;
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
          color: #374151;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.15s;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
        }
        .dropdown-link:hover {
          background: rgba(27,58,107,0.06);
          color: #1B3A6B;
          padding-left: 1.25rem;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-login {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #1B3A6B;
          background: none;
          border: 1.5px solid rgba(27,58,107,0.25);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar.top .btn-login { color: #fff; border-color: rgba(255,255,255,0.4); }
        .btn-login:hover { background: rgba(27,58,107,0.06); border-color: #1B3A6B; }

        .btn-give {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #C9902A, #e0a83a);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 12px rgba(201,144,42,0.3);
        }
        .btn-give:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(201,144,42,0.4);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: #1B3A6B;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .navbar.top .hamburger span { background: #fff; }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 72px; left: 0; right: 0; bottom: 0;
          background: #fff;
          padding: 1.5rem 2rem;
          overflow-y: auto;
          flex-direction: column;
          gap: 0.25rem;
          z-index: 999;
        }
        .mobile-menu.open { display: flex; }
        .mobile-nav-link {
          padding: 0.875rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1B3A6B;
          text-decoration: none;
          border-bottom: 1px solid rgba(27,58,107,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-sub-link {
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          color: #6B7280;
          text-decoration: none;
          display: block;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-actions { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="logo-text">
              Gospel Light
              <span>Ministries</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label} className="nav-item">
                {link.children ? (
                  <>
                    <button className="nav-link">
                      {link.label}
                      <svg className="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <div className="dropdown">
                      {link.children.map((child) => (
                        <Link key={child.label} href={child.href} className="dropdown-link">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={link.href} className="nav-link">{link.label}</Link>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <Link href="/account/login" className="btn-login">Sign In</Link>
            <Link href="/give" className="btn-give">Give Now</Link>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <div key={link.label}>
            <Link href={link.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
            {link.children?.map((child) => (
              <Link key={child.label} href={child.href} className="mobile-sub-link" onClick={() => setMenuOpen(false)}>
                {child.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="mobile-actions">
          <Link href="/account/login" className="btn-login" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
          <Link href="/give" className="btn-give" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>
            Give Now
          </Link>
        </div>
      </div>
    </>
  );
}