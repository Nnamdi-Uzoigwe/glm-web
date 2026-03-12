import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    heading: "Ministry",
    links: [
      { label: "Sermons", href: "/ministry/sermons" },
      { label: "Devotionals", href: "/ministry/devotionals" },
      { label: "Prayer Wall", href: "/ministry/prayer" },
      { label: "Missions & Outreach", href: "/ministry/missions" },
    ],
  },
  {
    heading: "Courses",
    links: [
      { label: "Browse All Courses", href: "/courses" },
      { label: "My Courses", href: "/account/dashboard" },
      { label: "Instructors", href: "/courses/instructors" },
      { label: "Certificates", href: "/account/certificates" },
    ],
  },
  {
    heading: "Church",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog & Articles", href: "/resources/blog" },
      { label: "Videos", href: "/resources/videos" },
      { label: "Podcast", href: "/resources/podcast" },
      { label: "Store", href: "/resources/store" },
    ],
  },
];

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1B3A6B"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .footer {
          background: #0c1f3d;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.7);
        }

        .footer-top {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem;
          display: grid;
          grid-template-columns: 1.4fr repeat(4, 1fr);
          gap: 3rem;
        }

        .footer-brand {}
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }
        .footer-logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #1B3A6B, #2a5298);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
        }
        .footer-logo-text span {
          display: block;
          font-size: 0.68rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f0c97a;
        }
        .footer-tagline {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 1.75rem;
          font-weight: 300;
          max-width: 240px;
        }

        /* Newsletter */
        .newsletter-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #C9902A;
          font-weight: 600;
          margin-bottom: 0.6rem;
        }
        .newsletter-form {
          display: flex;
          gap: 0;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.65rem 1rem;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-right: none;
          border-radius: 8px 0 0 8px;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: rgba(201,144,42,0.5); }
        .newsletter-btn {
          padding: 0.65rem 1rem;
          background: #C9902A;
          border: none;
          border-radius: 0 8px 8px 0;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
        }
        .newsletter-btn:hover { background: #e0a83a; }

        .socials {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }
        .social-btn {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-btn:hover {
          background: rgba(201,144,42,0.2);
          border-color: rgba(201,144,42,0.3);
          color: #f0c97a;
        }

        /* Footer columns */
        .footer-col {}
        .footer-col-heading {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        .footer-col-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-col-links a {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 300;
        }
        .footer-col-links a:hover { color: #f0c97a; }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 2rem;
        }
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copy {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }
        .footer-legal a {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover { color: rgba(255,255,255,0.6); }

        @media (max-width: 1024px) {
          .footer-top { grid-template-columns: 1fr 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; padding: 3rem 1.5rem 2rem; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="footer-logo-text">
                Gospel Light
                <span>Ministries</span>
              </div>
            </Link>
            <p className="footer-tagline">
              Spreading the light of the Gospel — one life, one community, one nation at a time.
            </p>
            <p className="newsletter-label">Stay Connected</p>
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
              />
              <button className="newsletter-btn" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="footer-col">
              <h4 className="footer-col-heading">{col.heading}</h4>
              <ul className="footer-col-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {new Date().getFullYear()} Gospel Light Ministries. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}