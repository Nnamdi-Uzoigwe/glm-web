import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #0c1f3d;
          font-family: 'DM Sans', sans-serif;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(27,58,107,0.85) 0%, transparent 70%),
            radial-gradient(ellipse 50% 80% at 10% 80%, rgba(201,144,42,0.12) 0%, transparent 60%),
            linear-gradient(135deg, #0c1f3d 0%, #1B3A6B 60%, #0c1f3d 100%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(201,144,42,0.15) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(27,58,107,0.4) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 8rem 2rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,144,42,0.15);
          border: 1px solid rgba(201,144,42,0.3);
          border-radius: 100px;
          padding: 0.4rem 1rem;
          margin-bottom: 1.5rem;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: #C9902A;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-badge-text {
          font-size: 0.78rem;
          font-weight: 500;
          color: #f0c97a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 1.5rem;
        }
        .hero-title em {
          font-style: italic;
          color: #f0c97a;
        }

        .hero-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 2rem;
          background: linear-gradient(135deg, #C9902A, #e0a83a);
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(201,144,42,0.35);
          font-family: 'DM Sans', sans-serif;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,144,42,0.45);
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 2rem;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          font-family: 'DM Sans', sans-serif;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.3);
        }

        .hero-stats {
          display: flex;
          gap: 2.5rem;
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .stat-item {}
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #f0c97a;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }

        /* Right side visual card */
        .hero-visual {
          position: relative;
        }
        .hero-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C9902A, #f0c97a, #C9902A);
        }
        .sermon-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #C9902A;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .sermon-thumb {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, #1B3A6B, #0c1f3d);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          position: relative;
          overflow: hidden;
        }
        .sermon-thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(201,144,42,0.2), transparent 60%);
        }
        .play-btn {
          width: 56px; height: 56px;
          background: rgba(201,144,42,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: transform 0.2s;
          cursor: pointer;
        }
        .play-btn:hover { transform: scale(1.1); }
        .sermon-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.4rem;
        }
        .sermon-meta {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sermon-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .floating-badge {
          position: absolute;
          top: -16px;
          right: 24px;
          background: #1B3A6B;
          border: 2px solid rgba(201,144,42,0.4);
          border-radius: 12px;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .floating-badge-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #C9902A, #e0a83a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .floating-badge-text {
          font-size: 0.8rem;
          color: #fff;
          font-weight: 500;
          line-height: 1.2;
        }
        .floating-badge-text span {
          display: block;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 6rem;
          }
          .hero-desc { max-width: 100%; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-visual { display: none; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div className="hero-inner">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              <span className="hero-badge-text">Live Sunday Service — Join Us</span>
            </div>

            <h1 className="hero-title">
              Spreading the <em>Gospel Light</em> to Every Nation
            </h1>

            <p className="hero-desc">
              Join a growing community of believers equipped through powerful gospel ministry,
              discipleship courses, and Spirit-filled outreach reaching the world with Christ's love.
            </p>

            <div className="hero-actions">
              <Link href="/courses" className="hero-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Explore Courses
              </Link>
              <Link href="/ministry/sermons" className="hero-btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
                </svg>
                Watch Sermon
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">40+</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Nations</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <div className="floating-badge">
              <div className="floating-badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div className="floating-badge-text">
                New Course Live
                <span>Everyday Evangelism</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="sermon-label">🎙 Latest Sermon</div>
              <div className="sermon-thumb">
                <div className="play-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
              <div className="sermon-title">Walking in the Light of the Gospel</div>
              <div className="sermon-meta">
                <span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  42 mins
                </span>
                <span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  Pastor James Okafor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}