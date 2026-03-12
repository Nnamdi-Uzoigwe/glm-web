import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  sessions: number;
  price: number;
  tag: string;
  tagColor: string;
  description: string;
  icon: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Foundations of the Gospel",
    instructor: "Pastor James Okafor",
    sessions: 8,
    price: 25,
    tag: "Bestseller",
    tagColor: "#C9902A",
    description: "A comprehensive introduction to the core truths of the Gospel and how to live them out daily.",
    icon: "📖",
  },
  {
    id: 2,
    title: "Everyday Evangelism",
    instructor: "Pastor Sarah Adeyemi",
    sessions: 6,
    price: 20,
    tag: "New",
    tagColor: "#1B3A6B",
    description: "Practical tools to share your faith naturally in everyday conversations and relationships.",
    icon: "🌍",
  },
  {
    id: 3,
    title: "Prayer & Spiritual Growth",
    instructor: "Elder David Mensah",
    sessions: 10,
    price: 30,
    tag: "Popular",
    tagColor: "#2D6A4F",
    description: "Deepen your prayer life and discover spiritual disciplines that lead to lasting transformation.",
    icon: "🙏",
  },
];

export default function CoursesPreview() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .courses-section {
          background: #f4f6fb;
          padding: 6rem 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .courses-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .courses-header {
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

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .course-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(27,58,107,0.06);
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
        }
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(27,58,107,0.1);
          border-color: rgba(27,58,107,0.1);
        }
        .course-thumb {
          height: 160px;
          background: linear-gradient(135deg, #1B3A6B, #0c1f3d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          position: relative;
        }
        .course-thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(201,144,42,0.15), transparent 60%);
        }
        .course-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 1;
        }
        .course-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .course-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1B3A6B;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        .course-desc {
          font-size: 0.85rem;
          color: #6B7280;
          line-height: 1.65;
          margin-bottom: 1.25rem;
          font-weight: 300;
          flex: 1;
        }
        .course-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(27,58,107,0.06);
          margin-top: auto;
          flex-wrap: wrap;
        }
        .course-instructor {
          font-size: 0.8rem;
          color: #9CA3AF;
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .course-sessions {
          font-size: 0.8rem;
          color: #9CA3AF;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .course-footer {
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .course-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1B3A6B;
          font-family: 'Cormorant Garamond', serif;
        }
        .course-price span {
          font-size: 0.85rem;
          font-weight: 400;
          color: #9CA3AF;
          font-family: 'DM Sans', sans-serif;
        }
        .enroll-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.6rem 1.25rem;
          background: #1B3A6B;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .enroll-btn:hover {
          background: #C9902A;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .courses-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .courses-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="courses-section">
        <div className="courses-inner">
          <div className="courses-header">
            <div>
              <p className="section-eyebrow">Learn & Grow</p>
              <h2 className="section-title">Featured Courses</h2>
            </div>
            <Link href="/courses" className="view-all-link">
              View All Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-thumb">
                  <span
                    className="course-tag"
                    style={{ background: course.tagColor }}
                  >
                    {course.tag}
                  </span>
                  <span style={{ zIndex: 1 }}>{course.icon}</span>
                </div>
                <div className="course-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-meta">
                    <span className="course-instructor">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      {course.instructor}
                    </span>
                    <span className="course-sessions">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      {course.sessions} sessions
                    </span>
                  </div>
                </div>
                <div className="course-footer">
                  <div className="course-price">
                    ${course.price} <span>/ one-time</span>
                  </div>
                  <Link href={`/courses/${course.id}`} className="enroll-btn">
                    Enroll
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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