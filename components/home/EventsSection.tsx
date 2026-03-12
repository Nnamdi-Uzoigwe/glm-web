import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  type: string;
  typeColor: string;
  free: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Sunday Worship & Outreach Service",
    date: "Mar 16, 2026",
    day: "16",
    month: "MAR",
    time: "9:00 AM",
    location: "Main Auditorium",
    type: "Worship",
    typeColor: "#1B3A6B",
    free: true,
  },
  {
    id: 2,
    title: "Gospel Light Leadership Conference",
    date: "Mar 22, 2026",
    day: "22",
    month: "MAR",
    time: "10:00 AM",
    location: "Conference Hall",
    type: "Conference",
    typeColor: "#C9902A",
    free: false,
  },
  {
    id: 3,
    title: "Community Evangelism Outreach",
    date: "Mar 29, 2026",
    day: "29",
    month: "MAR",
    time: "8:00 AM",
    location: "City Centre Park",
    type: "Outreach",
    typeColor: "#2D6A4F",
    free: true,
  },
  {
    id: 4,
    title: "Prayer & Fasting Night",
    date: "Apr 5, 2026",
    day: "05",
    month: "APR",
    time: "7:00 PM",
    location: "Prayer Hall",
    type: "Prayer",
    typeColor: "#7B1F2E",
    free: true,
  },
];

export default function EventsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .events-section {
          background: #fff;
          padding: 6rem 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .events-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .events-header {
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
        .view-all-link:hover { color: #C9902A; border-color: #C9902A; }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .event-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: #f8f9fc;
          border: 1px solid rgba(27,58,107,0.06);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.25s;
          text-decoration: none;
        }
        .event-card:hover {
          background: #fff;
          box-shadow: 0 6px 28px rgba(27,58,107,0.09);
          transform: translateX(5px);
          border-color: rgba(27,58,107,0.12);
        }

        .event-date-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 62px; height: 62px;
          background: #1B3A6B;
          border-radius: 14px;
          flex-shrink: 0;
        }
        .event-day {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .event-month {
          font-size: 0.65rem;
          font-weight: 600;
          color: #f0c97a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .event-info { flex: 1; }
        .event-type-tag {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .event-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1B3A6B;
          margin-bottom: 0.4rem;
          line-height: 1.3;
          font-family: 'DM Sans', sans-serif;
        }
        .event-meta {
          display: flex;
          gap: 1.25rem;
          font-size: 0.8rem;
          color: #9CA3AF;
          flex-wrap: wrap;
        }
        .event-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .event-action {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 0.75rem;
        }
        .free-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2D6A4F;
          background: rgba(45,106,79,0.1);
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
        }
        .register-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.55rem 1.1rem;
          background: #1B3A6B;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .register-btn:hover { background: #C9902A; }

        @media (max-width: 640px) {
          .event-card { flex-wrap: wrap; }
          .event-action { width: 100%; justify-content: flex-start; padding-top: 0.75rem; border-top: 1px solid rgba(27,58,107,0.06); }
        }
      `}</style>

      <section className="events-section">
        <div className="events-inner">
          <div className="events-header">
            <div>
              <p className="section-eyebrow">Mark Your Calendar</p>
              <h2 className="section-title">Upcoming Events</h2>
            </div>
            <Link href="/events" className="view-all-link">
              View All Events
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="events-list">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date-box">
                  <span className="event-day">{event.day}</span>
                  <span className="event-month">{event.month}</span>
                </div>

                <div className="event-info">
                  <span
                    className="event-type-tag"
                    style={{ background: event.typeColor }}
                  >
                    {event.type}
                  </span>
                  <div className="event-title">{event.title}</div>
                  <div className="event-meta">
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {event.time}
                    </span>
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="event-action">
                  {event.free && <span className="free-badge">Free</span>}
                  <Link href={`/events/${event.id}`} className="register-btn">
                    Register
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}