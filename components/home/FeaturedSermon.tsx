import Link from "next/link";

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  series: string;
  date: string;
  featured?: boolean;
}

const sermons: Sermon[] = [
  {
    id: 1,
    title: "Walking in the Light of the Gospel",
    speaker: "Pastor James Okafor",
    duration: "42 mins",
    series: "Gospel Foundations",
    date: "Mar 9, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    speaker: "Pastor Sarah Adeyemi",
    duration: "38 mins",
    series: "Easter Series",
    date: "Mar 2, 2026",
  },
  {
    id: 3,
    title: "Sent: Your Mission in Everyday Life",
    speaker: "Pastor James Okafor",
    duration: "45 mins",
    series: "Outreach",
    date: "Feb 23, 2026",
  },
];

export default function FeaturedSermon() {
  const featured = sermons.find((s) => s.featured)!;
  const rest = sermons.filter((s) => !s.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sermons {
          background: #fff;
          padding: 6rem 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .sermons-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .section-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #C9902A;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1B3A6B;
          margin: 0;
          line-height: 1.15;
        }
        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1B3A6B;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(27,58,107,0.25);
          padding-bottom: 2px;
          transition: all 0.2s;
        }
        .view-all-link:hover {
          color: #C9902A;
          border-color: #C9902A;
        }

        .sermons-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* Featured card */
        .featured-card {
          background: #f8f9fc;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(27,58,107,0.06);
          transition: all 0.3s;
        }
        .featured-card:hover {
          box-shadow: 0 12px 48px rgba(27,58,107,0.1);
          transform: translateY(-3px);
        }
        .featured-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1B3A6B 0%, #0c1f3d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .featured-thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(201,144,42,0.2), transparent 60%);
        }
        .featured-play {
          width: 64px; height: 64px;
          background: rgba(201,144,42,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all 0.25s;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(201,144,42,0.4);
        }
        .featured-play:hover {
          transform: scale(1.1);
          background: #C9902A;
        }
        .featured-body {
          padding: 1.75rem;
        }
        .series-tag {
          display: inline-block;
          background: rgba(27,58,107,0.08);
          color: #1B3A6B;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          margin-bottom: 0.875rem;
        }
        .featured-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #1B3A6B;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }
        .sermon-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-size: 0.83rem;
          color: #6B7280;
          flex-wrap: wrap;
        }
        .sermon-info span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Recent sermons list */
        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .recent-card {
          background: #f8f9fc;
          border: 1px solid rgba(27,58,107,0.06);
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.25s;
          text-decoration: none;
          cursor: pointer;
        }
        .recent-card:hover {
          background: #fff;
          box-shadow: 0 4px 20px rgba(27,58,107,0.08);
          transform: translateX(4px);
          border-color: rgba(27,58,107,0.12);
        }
        .recent-thumb {
          width: 72px; height: 52px;
          background: linear-gradient(135deg, #1B3A6B, #2a5298);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .recent-play {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .recent-info {}
        .recent-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1B3A6B;
          margin-bottom: 0.3rem;
          line-height: 1.3;
          font-family: 'DM Sans', sans-serif;
        }
        .recent-meta {
          font-size: 0.78rem;
          color: #9CA3AF;
          display: flex;
          gap: 10px;
        }

        @media (max-width: 900px) {
          .sermons-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="sermons">
        <div className="sermons-inner">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Word & Worship</p>
              <h2 className="section-title">Recent Sermons</h2>
            </div>
            <Link href="/ministry/sermons" className="view-all-link">
              View All Sermons
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="sermons-grid">
            {/* Featured Sermon */}
            <div className="featured-card">
              <div className="featured-thumb">
                <div className="featured-play">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
              <div className="featured-body">
                <span className="series-tag">{featured.series}</span>
                <h3 className="featured-title">{featured.title}</h3>
                <div className="sermon-info">
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {featured.speaker}
                  </span>
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {featured.duration}
                  </span>
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {featured.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent List */}
            <div className="recent-list">
              {rest.map((sermon) => (
                <Link href={`/ministry/sermons/${sermon.id}`} key={sermon.id} className="recent-card">
                  <div className="recent-thumb">
                    <div className="recent-play">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="recent-info">
                    <div className="recent-title">{sermon.title}</div>
                    <div className="recent-meta">
                      <span>{sermon.speaker}</span>
                      <span>·</span>
                      <span>{sermon.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}