export default function MissionSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .mission {
          background: #1B3A6B;
          padding: 5rem 2rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .mission::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 200px;
          background: radial-gradient(ellipse, rgba(201,144,42,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .mission-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 5rem;
          align-items: center;
        }
        .mission-left {}
        .mission-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #C9902A;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .mission-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 1.25rem;
        }
        .mission-heading em {
          font-style: italic;
          color: #f0c97a;
        }
        .mission-text {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          font-weight: 300;
        }

        .mission-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .pillar-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .pillar-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C9902A, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pillar-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(201,144,42,0.25);
          transform: translateY(-3px);
        }
        .pillar-card:hover::after { opacity: 1; }

        .pillar-icon {
          width: 44px; height: 44px;
          background: rgba(201,144,42,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        .pillar-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .pillar-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .mission-inner { grid-template-columns: 1fr; gap: 3rem; }
          .mission-heading { font-size: 2.2rem; }
        }
        @media (max-width: 500px) {
          .mission-pillars { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="mission">
        <div className="mission-inner">
          <div className="mission-left">
            <p className="mission-eyebrow">Our Purpose</p>
            <h2 className="mission-heading">
              Built on the <em>Word,</em> Sent into the <em>World</em>
            </h2>
            <p className="mission-text">
              Gospel Light Ministries exists to proclaim the good news of Jesus Christ,
              equip every believer for ministry, and reach communities near and far
              with the transforming power of the Gospel.
            </p>
          </div>

          <div className="mission-pillars">
            {[
              {
                icon: "🙏",
                title: "Prayer",
                desc: "A foundation of prayer that empowers every step of our outreach and ministry.",
              },
              {
                icon: "📖",
                title: "Discipleship",
                desc: "Growing believers through the Word, community, and structured gospel courses.",
              },
              {
                icon: "🌍",
                title: "Evangelism",
                desc: "Actively reaching the lost through outreach, missions, and everyday witness.",
              },
              {
                icon: "🤝",
                title: "Community",
                desc: "A warm, welcoming family where every person belongs and is valued.",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="pillar-card">
                <div className="pillar-icon">{pillar.icon}</div>
                <div className="pillar-title">{pillar.title}</div>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}