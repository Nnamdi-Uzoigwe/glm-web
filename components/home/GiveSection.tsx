import Link from "next/link";

export default function GiveSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .give-section {
          background: #1B3A6B;
          padding: 6rem 2rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .give-bg-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(201,144,42,0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(255,255,255,0.04) 0%, transparent 40%);
          pointer-events: none;
        }
        .give-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .give-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .give-left {}
        .give-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #f0c97a;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .give-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 1.25rem;
        }
        .give-title em {
          font-style: italic;
          color: #f0c97a;
        }
        .give-text {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 2rem;
        }
        .give-impact {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .impact-item {}
        .impact-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #f0c97a;
        }
        .impact-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        /* Giving card */
        .give-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          padding: 2.25rem;
        }
        .give-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .amount-btn {
          padding: 0.75rem;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Cormorant Garamond', serif;
          text-align: center;
        }
        .amount-btn:hover, .amount-btn.active {
          background: rgba(201,144,42,0.25);
          border-color: #C9902A;
          color: #f0c97a;
        }
        .custom-input-wrap {
          position: relative;
          margin-bottom: 1.25rem;
        }
        .currency-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
          font-weight: 500;
        }
        .custom-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2rem;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .custom-input::placeholder { color: rgba(255,255,255,0.35); }
        .custom-input:focus { border-color: rgba(201,144,42,0.6); }

        .give-frequency {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .freq-btn {
          flex: 1;
          padding: 0.6rem;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
        }
        .freq-btn.active {
          background: rgba(27,58,107,0.5);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }

        .give-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #C9902A, #e0a83a);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(201,144,42,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .give-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,144,42,0.45);
        }
        .secure-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 0.875rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        @media (max-width: 900px) {
          .give-inner { grid-template-columns: 1fr; gap: 3rem; }
          .give-title { font-size: 2.2rem; }
        }
      `}</style>

      <section className="give-section">
        <div className="give-bg-pattern" />
        <div className="give-grid-lines" />

        <div className="give-inner">
          <div className="give-left">
            <p className="give-eyebrow">Make a Difference</p>
            <h2 className="give-title">
              Partner with Us to <em>Spread the Light</em>
            </h2>
            <p className="give-text">
              Your generous giving fuels gospel outreach, funds ministry courses, and sends
              missionaries to unreached communities. Every gift, big or small, makes an eternal impact.
            </p>
            <div className="give-impact">
              <div className="impact-item">
                <div className="impact-number">120+</div>
                <div className="impact-label">Families supported</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">18</div>
                <div className="impact-label">Missions funded</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">$90K</div>
                <div className="impact-label">Given this year</div>
              </div>
            </div>
          </div>

          {/* Giving Card */}
          <div className="give-card">
            <h3 className="give-card-title">Choose an Amount</h3>

            <div className="amount-grid">
              {["$10", "$25", "$50", "$100", "$250", "$500"].map((amt) => (
                <button key={amt} className={`amount-btn ${amt === "$25" ? "active" : ""}`}>
                  {amt}
                </button>
              ))}
            </div>

            <div className="custom-input-wrap">
              <span className="currency-prefix">$</span>
              <input
                type="number"
                className="custom-input"
                placeholder="Custom amount"
              />
            </div>

            <div className="give-frequency">
              {["One-time", "Monthly", "Annually"].map((f) => (
                <button key={f} className={`freq-btn ${f === "One-time" ? "active" : ""}`}>
                  {f}
                </button>
              ))}
            </div>

            <Link href="/give" className="give-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Give Now
            </Link>

            <div className="secure-note">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure & encrypted payment
            </div>
          </div>
        </div>
      </section>
    </>
  );
}