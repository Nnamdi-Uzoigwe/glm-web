export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory =
  | "All"
  | "Gospel"
  | "Leadership"
  | "Evangelism"
  | "Discipleship"
  | "Prayer";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  preview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  role: string;
  bio: string;
  initials: string;
  credentials: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: Exclude<CourseCategory, "All">;
  level: CourseLevel;
  price: number;
  isFree: boolean;
  rating: number;
  reviewCount: number;
  studentCount: number;
  lessonCount: number;
  duration: string;
  instructor: Instructor;
  modules: Module[];
  whatYouLearn: string[];
  featured?: boolean;
}

export const courses: Course[] = [
  {
    id: "1",
    slug: "gospel-foundations",
    title: "Gospel Foundations",
    subtitle: "Understanding the core message of Jesus Christ",
    description:
      "A comprehensive introduction to the Gospel — what it is, why it matters, and how it transforms every area of life. Perfect for new believers and those wanting to deepen their understanding of God's redemptive story.",
    category: "Gospel",
    level: "Beginner",
    price: 29,
    isFree: false,
    rating: 4.9,
    reviewCount: 128,
    studentCount: 540,
    lessonCount: 12,
    duration: "6 hours",
    featured: true,
    instructor: {
      name: "Pastor John Adeyemi",
      role: "Senior Pastor & Founder",
      initials: "JA",
      bio: "Pastor John has over 20 years of gospel ministry experience, having preached in over 30 nations. He is passionate about making the Gospel clear, accessible, and transformative for everyday believers.",
      credentials: [
        "M.Div, Trinity Theological Seminary",
        "20+ years in ministry",
        "Author of 'Walking in the Light'",
        "Speaker at 50+ international conferences",
      ],
    },
    whatYouLearn: [
      "The full scope of the Gospel message from Genesis to Revelation",
      "How the Gospel applies to everyday life and decisions",
      "Biblical foundations of salvation, grace and redemption",
      "How to share the Gospel clearly and confidently",
    ],
    modules: [
      {
        id: "m1",
        title: "What Is the Gospel?",
        lessons: [
          { id: "l1", title: "Introduction: God's Great Story", duration: "18 min", preview: true },
          { id: "l2", title: "Creation, Fall, and the Need for Rescue", duration: "22 min" },
          { id: "l3", title: "The Person and Work of Jesus Christ", duration: "25 min" },
        ],
      },
      {
        id: "m2",
        title: "Grace, Faith & Repentance",
        lessons: [
          { id: "l4", title: "What Is Saving Grace?", duration: "20 min" },
          { id: "l5", title: "The Role of Faith in Salvation", duration: "18 min" },
          { id: "l6", title: "True Repentance vs. Remorse", duration: "24 min" },
        ],
      },
      {
        id: "m3",
        title: "Living the Gospel Daily",
        lessons: [
          { id: "l7", title: "Gospel Identity — Who You Are in Christ", duration: "21 min" },
          { id: "l8", title: "The Gospel and Your Relationships", duration: "19 min" },
          { id: "l9", title: "Sharing the Gospel Naturally", duration: "26 min", preview: true },
        ],
      },
      {
        id: "m4",
        title: "The Gospel and the Church",
        lessons: [
          { id: "l10", title: "Why the Church Exists", duration: "20 min" },
          { id: "l11", title: "Your Role in the Body of Christ", duration: "17 min" },
          { id: "l12", title: "Carrying the Gospel to the Nations", duration: "28 min" },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "evangelism-in-everyday-life",
    title: "Evangelism in Everyday Life",
    subtitle: "Sharing your faith naturally and boldly",
    description:
      "Learn practical, Spirit-led strategies for sharing the Gospel in your home, workplace, and community without fear or awkwardness.",
    category: "Evangelism",
    level: "Beginner",
    price: 0,
    isFree: true,
    rating: 4.8,
    reviewCount: 95,
    studentCount: 820,
    lessonCount: 8,
    duration: "4 hours",
    instructor: {
      name: "Pastor Mike Okonkwo",
      role: "Associate Pastor & Outreach Lead",
      initials: "MO",
      bio: "Pastor Mike has led hundreds of street evangelism campaigns and trained thousands of believers in practical outreach. His approach is bold, warm, and deeply rooted in Scripture.",
      credentials: [
        "B.Th, Faith Bible College",
        "15 years in outreach ministry",
        "Trained 3,000+ believers in evangelism",
      ],
    },
    whatYouLearn: [
      "Overcome the fear of sharing your faith",
      "Natural conversation bridges to the Gospel",
      "How to give a clear 2-minute testimony",
      "Following up with new believers",
    ],
    modules: [
      {
        id: "m1",
        title: "The Heart of an Evangelist",
        lessons: [
          { id: "l1", title: "Why Every Believer Is Called", duration: "15 min", preview: true },
          { id: "l2", title: "Overcoming the Fear of Rejection", duration: "18 min" },
        ],
      },
      {
        id: "m2",
        title: "Practical Gospel Conversations",
        lessons: [
          { id: "l3", title: "Starting Spiritual Conversations", duration: "20 min" },
          { id: "l4", title: "Sharing Your Story in 2 Minutes", duration: "22 min" },
          { id: "l5", title: "Answering Common Objections", duration: "25 min" },
        ],
      },
      {
        id: "m3",
        title: "Your Mission Field",
        lessons: [
          { id: "l6", title: "Evangelism at Home & Work", duration: "18 min" },
          { id: "l7", title: "Community Outreach Strategies", duration: "20 min" },
          { id: "l8", title: "Following Up & Discipling New Believers", duration: "22 min" },
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "prayer-and-intercession",
    title: "Prayer & Intercession",
    subtitle: "Building a powerful, consistent prayer life",
    description:
      "A deep dive into the theology and practice of prayer — from personal devotion to corporate intercession. Learn to pray with faith, precision, and persistence.",
    category: "Prayer",
    level: "Intermediate",
    price: 39,
    isFree: false,
    rating: 4.7,
    reviewCount: 76,
    studentCount: 310,
    lessonCount: 10,
    duration: "5 hours",
    instructor: {
      name: "Minister Ruth Babatunde",
      role: "Worship & Prayer Ministry Director",
      initials: "RB",
      bio: "Minister Ruth leads our prayer ministry and has been instrumental in building a culture of intercession at Gospel Light. She teaches prayer with depth, passion, and practical wisdom.",
      credentials: [
        "Cert. in Pastoral Studies",
        "12 years in prayer ministry",
        "Led 100+ prayer retreats",
      ],
    },
    whatYouLearn: [
      "Foundations of effective prayer in Scripture",
      "How to pray for healing, breakthrough, and nations",
      "Building a consistent personal prayer habit",
      "The role of intercession in spiritual warfare",
    ],
    modules: [
      {
        id: "m1",
        title: "Foundations of Prayer",
        lessons: [
          { id: "l1", title: "Why Prayer Changes Things", duration: "20 min", preview: true },
          { id: "l2", title: "The Model Prayer Unpacked", duration: "24 min" },
          { id: "l3", title: "Hindrances to Effective Prayer", duration: "18 min" },
        ],
      },
      {
        id: "m2",
        title: "Types of Prayer",
        lessons: [
          { id: "l4", title: "Petition, Thanksgiving & Worship", duration: "22 min" },
          { id: "l5", title: "Intercession for Others & Nations", duration: "26 min" },
          { id: "l6", title: "Spiritual Warfare & Declarations", duration: "28 min" },
        ],
      },
      {
        id: "m3",
        title: "Building a Prayer Life",
        lessons: [
          { id: "l7", title: "Creating a Daily Prayer Rhythm", duration: "18 min" },
          { id: "l8", title: "Prayer Journaling & Listening", duration: "16 min" },
          { id: "l9", title: "Fasting and Prayer", duration: "22 min" },
          { id: "l10", title: "Corporate Prayer & Prayer Meetings", duration: "20 min" },
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "leadership-in-ministry",
    title: "Leadership in Ministry",
    subtitle: "Serving with excellence, integrity and vision",
    description:
      "Equip yourself for effective Christian leadership — whether you lead a small group, a department, or a congregation. Biblical principles meet practical application.",
    category: "Leadership",
    level: "Intermediate",
    price: 49,
    isFree: false,
    rating: 4.9,
    reviewCount: 112,
    studentCount: 430,
    lessonCount: 14,
    duration: "7 hours",
    featured: true,
    instructor: {
      name: "Pastor Sarah Adeyemi",
      role: "Co-Pastor & Leadership Development",
      initials: "SA",
      bio: "Pastor Sarah has trained hundreds of ministry leaders across Africa and beyond. She combines deep biblical insight with practical leadership coaching to equip believers for lasting impact.",
      credentials: [
        "M.A. Christian Leadership, Gordon-Conwell",
        "18 years in ministry",
        "Leadership coach to 200+ pastors",
        "Co-author of 'Lead Like Christ'",
      ],
    },
    whatYouLearn: [
      "The character and calling of a Christian leader",
      "Servant leadership modelled by Jesus",
      "Building and empowering a team",
      "Navigating conflict and difficult seasons",
    ],
    modules: [
      {
        id: "m1",
        title: "The Leader's Foundation",
        lessons: [
          { id: "l1", title: "Called to Lead: Identity Before Role", duration: "22 min", preview: true },
          { id: "l2", title: "Character: The Non-Negotiables", duration: "25 min" },
          { id: "l3", title: "Servant Leadership in Practice", duration: "20 min" },
        ],
      },
      {
        id: "m2",
        title: "Leading People",
        lessons: [
          { id: "l4", title: "Understanding the People You Lead", duration: "18 min" },
          { id: "l5", title: "Empowering & Delegating Effectively", duration: "22 min" },
          { id: "l6", title: "Navigating Conflict Biblically", duration: "24 min" },
          { id: "l7", title: "Giving & Receiving Feedback", duration: "16 min" },
        ],
      },
      {
        id: "m3",
        title: "Vision & Strategy",
        lessons: [
          { id: "l8", title: "Hearing God for Direction", duration: "20 min" },
          { id: "l9", title: "Casting Vision That Moves People", duration: "22 min" },
          { id: "l10", title: "Planning with Faith and Wisdom", duration: "18 min" },
        ],
      },
      {
        id: "m4",
        title: "Sustaining the Leader",
        lessons: [
          { id: "l11", title: "Protecting Your Inner Life", duration: "20 min" },
          { id: "l12", title: "Avoiding Burnout in Ministry", duration: "18 min" },
          { id: "l13", title: "Accountability and Mentorship", duration: "16 min" },
          { id: "l14", title: "Finishing Well", duration: "24 min" },
        ],
      },
    ],
  },
  {
    id: "5",
    slug: "discipleship-principles",
    title: "Discipleship Principles",
    subtitle: "Making and multiplying mature followers of Christ",
    description:
      "Learn the Jesus model of discipleship — how to walk closely with God, invest in others, and build disciples who make disciples.",
    category: "Discipleship",
    level: "Beginner",
    price: 29,
    isFree: false,
    rating: 4.8,
    reviewCount: 88,
    studentCount: 360,
    lessonCount: 9,
    duration: "4.5 hours",
    instructor: {
      name: "Deacon Paul Nwosu",
      role: "Head of Missions & Discipleship",
      initials: "PN",
      bio: "Deacon Paul has planted churches and trained discipleship networks across West Africa. His teaching on discipleship is grounded in Scripture and proven in real communities.",
      credentials: [
        "Cert. Missiology, All Nations College",
        "10 years in discipleship ministry",
        "Planted 12 churches",
      ],
    },
    whatYouLearn: [
      "What discipleship really means in Scripture",
      "How Jesus discipled the twelve",
      "One-on-one discipleship methods that work",
      "Building a multiplication movement in your church",
    ],
    modules: [
      {
        id: "m1",
        title: "What Is Discipleship?",
        lessons: [
          { id: "l1", title: "The Great Commission Revisited", duration: "18 min", preview: true },
          { id: "l2", title: "How Jesus Made Disciples", duration: "22 min" },
          { id: "l3", title: "What a Mature Disciple Looks Like", duration: "20 min" },
        ],
      },
      {
        id: "m2",
        title: "Practising Discipleship",
        lessons: [
          { id: "l4", title: "Finding and Choosing a Disciple", duration: "18 min" },
          { id: "l5", title: "The Discipleship Meeting Structure", duration: "24 min" },
          { id: "l6", title: "Using Scripture in Discipleship", duration: "20 min" },
        ],
      },
      {
        id: "m3",
        title: "Multiplication",
        lessons: [
          { id: "l7", title: "Training Disciples to Disciple Others", duration: "22 min" },
          { id: "l8", title: "Building Discipleship Culture in Your Church", duration: "20 min" },
          { id: "l9", title: "Discipleship and Missions", duration: "24 min" },
        ],
      },
    ],
  },
  {
    id: "6",
    slug: "knowing-god-deeply",
    title: "Knowing God Deeply",
    subtitle: "A journey into the character and presence of God",
    description:
      "Go beyond surface-level faith into a rich, intimate knowledge of who God is — His attributes, His heart, and how He reveals Himself to those who seek Him.",
    category: "Gospel",
    level: "Advanced",
    price: 39,
    isFree: false,
    rating: 5.0,
    reviewCount: 54,
    studentCount: 210,
    lessonCount: 11,
    duration: "5.5 hours",
    instructor: {
      name: "Pastor Grace Eze",
      role: "Youth Pastor & Bible Teacher",
      initials: "GE",
      bio: "Pastor Grace is known for her deep, revelatory Bible teaching. She brings theological depth and personal warmth to every lesson, helping believers fall in love with God all over again.",
      credentials: [
        "B.A. Biblical Studies, ECWA Theological Seminary",
        "8 years in Bible teaching ministry",
        "Speaker at national youth conferences",
      ],
    },
    whatYouLearn: [
      "The key attributes of God revealed in Scripture",
      "How to cultivate intimacy with God daily",
      "Understanding God's will and voice",
      "Experiencing God in worship, Word, and prayer",
    ],
    modules: [
      {
        id: "m1",
        title: "The Attributes of God",
        lessons: [
          { id: "l1", title: "God Is Holy — What That Means for Us", duration: "24 min", preview: true },
          { id: "l2", title: "The Love and Justice of God", duration: "22 min" },
          { id: "l3", title: "God's Omniscience, Omnipotence & Presence", duration: "26 min" },
        ],
      },
      {
        id: "m2",
        title: "Drawing Near to God",
        lessons: [
          { id: "l4", title: "What It Means to Seek God", duration: "20 min" },
          { id: "l5", title: "Worship as a Lifestyle", duration: "18 min" },
          { id: "l6", title: "Meditating on Scripture", duration: "22 min" },
          { id: "l7", title: "Hearing God's Voice", duration: "25 min" },
        ],
      },
      {
        id: "m3",
        title: "Living in His Presence",
        lessons: [
          { id: "l8", title: "Abiding in Christ — What It Really Means", duration: "20 min" },
          { id: "l9", title: "Dry Seasons and How to Navigate Them", duration: "18 min" },
          { id: "l10", title: "The Fear of the Lord", duration: "22 min" },
          { id: "l11", title: "Growing Deeper — A Lifelong Journey", duration: "20 min" },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  if (category === "All") return courses;
  return courses.filter((c) => c.category === category);
}

export const categories: CourseCategory[] = [
  "All",
  "Gospel",
  "Evangelism",
  "Leadership",
  "Discipleship",
  "Prayer",
];