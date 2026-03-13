// ─── SERMONS ────────────────────────────────────────────────────────────────

export type SermonSeries =
  | "All"
  | "Gospel Foundations"
  | "The Holy Spirit"
  | "Faith & Prayer"
  | "Kingdom Living"
  | "End Times";

export interface Sermon {
  id: string;
  title: string;
  series: Exclude<SermonSeries, "All">;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  youtubeId: string; // YouTube video ID for embed
  scripture: string;
  tags: string[];
}

export const sermons: Sermon[] = [
  {
    id: "s1",
    title: "The Power of the Gospel",
    series: "Gospel Foundations",
    speaker: "Pastor John Adeyemi",
    date: "March 9, 2025",
    duration: "52 min",
    description:
      "An in-depth look at Romans 1:16 — why Paul was not ashamed of the Gospel and why we shouldn't be either. A foundational message for every believer.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Romans 1:16",
    tags: ["Gospel", "Salvation", "Faith"],
  },
  {
    id: "s2",
    title: "Walking in the Spirit",
    series: "The Holy Spirit",
    speaker: "Pastor Sarah Adeyemi",
    date: "March 2, 2025",
    duration: "48 min",
    description:
      "Understanding what it means to walk in the Spirit daily and how the Holy Spirit empowers believers for godly living and ministry.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Galatians 5:16-25",
    tags: ["Holy Spirit", "Sanctification"],
  },
  {
    id: "s3",
    title: "Praying With Authority",
    series: "Faith & Prayer",
    speaker: "Minister Ruth Babatunde",
    date: "February 23, 2025",
    duration: "44 min",
    description:
      "Discover the authority believers have in prayer through the name of Jesus. A practical message on bold, faith-filled intercession.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Luke 18:1-8",
    tags: ["Prayer", "Faith", "Intercession"],
  },
  {
    id: "s4",
    title: "Citizens of God's Kingdom",
    series: "Kingdom Living",
    speaker: "Pastor Mike Okonkwo",
    date: "February 16, 2025",
    duration: "50 min",
    description:
      "What does it mean to live as a citizen of God's Kingdom in a broken world? A compelling call to kingdom values and gospel witness.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Matthew 5:1-12",
    tags: ["Kingdom", "Discipleship"],
  },
  {
    id: "s5",
    title: "Grace That Covers All",
    series: "Gospel Foundations",
    speaker: "Pastor John Adeyemi",
    date: "February 9, 2025",
    duration: "55 min",
    description:
      "An exploration of the inexhaustible grace of God — what it means, what it costs, and how it changes everything about how we live.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Ephesians 2:4-10",
    tags: ["Grace", "Gospel", "Salvation"],
  },
  {
    id: "s6",
    title: "Filled With the Spirit",
    series: "The Holy Spirit",
    speaker: "Pastor John Adeyemi",
    date: "February 2, 2025",
    duration: "46 min",
    description:
      "A powerful message on the baptism and fullness of the Holy Spirit — what it is, why it matters, and how every believer can experience it.",
    youtubeId: "dQw4w9WgXcQ",
    scripture: "Acts 2:1-4",
    tags: ["Holy Spirit", "Pentecost"],
  },
];

export const sermonSeries: SermonSeries[] = [
  "All",
  "Gospel Foundations",
  "The Holy Spirit",
  "Faith & Prayer",
  "Kingdom Living",
  "End Times",
];

export const speakers = [
  "All Speakers",
  "Pastor John Adeyemi",
  "Pastor Sarah Adeyemi",
  "Pastor Mike Okonkwo",
  "Minister Ruth Babatunde",
  "Pastor Grace Eze",
];

// ─── DEVOTIONALS ─────────────────────────────────────────────────────────────

export interface Devotional {
  id: string;
  title: string;
  date: string;
  scripture: string;
  scriptureText: string;
  body: string;
  prayer: string;
  author: string;
  tags: string[];
}

export const devotionals: Devotional[] = [
  {
    id: "d1",
    title: "Rooted in His Love",
    date: "March 13, 2025",
    scripture: "Ephesians 3:17-19",
    scriptureText:
      "That Christ may dwell in your hearts through faith — that you, being rooted and grounded in love, may have strength to comprehend with all the saints what is the breadth and length and height and depth, and to know the love of Christ.",
    body: "There is no greater foundation than the love of God. When Paul prays for the Ephesians, he doesn't ask for more money, more influence, or more comfort. He asks that they would be rooted and grounded in love. Like a tree draws life from its roots, we draw everything we need from the deep, unshakeable love of Christ. Today, pause and let that love sink in. You are not defined by your failures or your strengths — you are defined by the One who loved you first.",
    prayer:
      "Father, root me deeper in Your love today. Help me to know, not just with my mind but with my heart, how wide and long and high and deep Your love for me is. Let that love be the ground I stand on. Amen.",
    author: "Pastor Sarah Adeyemi",
    tags: ["Love", "Identity", "Grace"],
  },
  {
    id: "d2",
    title: "When You Don't Feel God",
    date: "March 12, 2025",
    scripture: "Psalm 22:1-3",
    scriptureText:
      "My God, my God, why have you forsaken me? Why are you so far from saving me, so far from my cries of anguish? I cry out by day but you do not answer, by night, but I find no rest. Yet you are holy.",
    body: "Even David — a man after God's own heart — knew seasons of spiritual dryness. He cried out and heard silence. But notice what he does: he still calls God 'my God.' He still holds on. Dry seasons are not signs that God has left you. They are invitations to trust Him beyond your feelings. The sun does not disappear when clouds cover it. God is not absent when you cannot feel Him. Keep crying out. Keep worshipping. The clouds will pass.",
    prayer:
      "Lord, in this dry season I choose to trust You. Even when I cannot feel Your presence, I declare that You are still my God. Strengthen my faith and remind me that You never leave nor forsake Your children. Amen.",
    author: "Pastor John Adeyemi",
    tags: ["Faith", "Perseverance", "Worship"],
  },
  {
    id: "d3",
    title: "You Are Sent",
    date: "March 11, 2025",
    scripture: "John 20:21",
    scriptureText:
      "Jesus said to them again, 'Peace be with you. As the Father has sent me, even so I am sending you.'",
    body: "The same words the Father spoke over Jesus, Jesus now speaks over you: 'I am sending you.' You are not an accident. You are not waiting to be useful to God — you already are. Your neighbourhood, your workplace, your family — these are not obstacles to your mission, they are your mission field. The Gospel is not meant to stay inside church walls. It is meant to go with you wherever you go today.",
    prayer:
      "Jesus, thank You that I am sent with purpose. Help me to see the people around me the way You see them — as souls You love. Give me courage to carry the light of the Gospel wherever I go today. Amen.",
    author: "Pastor Mike Okonkwo",
    tags: ["Evangelism", "Mission", "Purpose"],
  },
  {
    id: "d4",
    title: "The Peace That Guards",
    date: "March 10, 2025",
    scripture: "Philippians 4:6-7",
    scriptureText:
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and minds in Christ Jesus.",
    body: "God's peace is not the absence of problems — it is the presence of God in the middle of your problems. Paul wrote these words from prison. Yet he speaks of a peace that transcends understanding. This is not a peace the world can manufacture or take away. It stands guard over your heart like a sentinel. The pathway to this peace is simple: prayer with thanksgiving. Not prayer filled with anxiety, but prayer that trusts God already has the answer.",
    prayer:
      "Lord, I bring my anxieties to You today. I choose to trade my worry for Your peace. Guard my heart and mind in Christ Jesus, and help me to live in the rest that only You can give. Amen.",
    author: "Minister Ruth Babatunde",
    tags: ["Peace", "Anxiety", "Prayer"],
  },
  {
    id: "d5",
    title: "New Every Morning",
    date: "March 9, 2025",
    scripture: "Lamentations 3:22-23",
    scriptureText:
      "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    body: "Jeremiah wrote these words in the middle of devastation — Jerusalem had fallen, the temple was destroyed. Yet in the ashes, he finds this truth: God's mercies are new every morning. Whatever yesterday looked like, today is a fresh start. His faithfulness is not dependent on your performance. Every morning you wake up is a new gift of grace. Receive it with gratitude and step into today knowing His compassions are running toward you.",
    prayer:
      "Thank You, Father, for new mercies today. I receive Your grace afresh. Let me not carry yesterday's failures into today. Your faithfulness is great, and I choose to trust it. Amen.",
    author: "Pastor Grace Eze",
    tags: ["Mercy", "Grace", "New Beginnings"],
  },
  {
    id: "d6",
    title: "Greater Is He",
    date: "March 8, 2025",
    scripture: "1 John 4:4",
    scriptureText:
      "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.",
    body: "Whatever you are facing today — fear, temptation, opposition, discouragement — the One inside you is greater. This is not positive thinking; it is a spiritual reality. The Holy Spirit of the living God dwells in every believer. You are not fighting for victory, you are fighting from victory. The enemy has already been defeated at Calvary. Walk today in the confidence of someone who knows whose they are.",
    prayer:
      "Holy Spirit, remind me today that You are greater than anything I face. Help me to walk in the victory that Christ has already won. I will not fear, for You are with me. Amen.",
    author: "Pastor John Adeyemi",
    tags: ["Victory", "Holy Spirit", "Strength"],
  },
];

// ─── PRAYER REQUESTS ─────────────────────────────────────────────────────────

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  category: string;
  date: string;
  prayerCount: number;
}

export const prayerRequests: PrayerRequest[] = [
  {
    id: "p1",
    name: "Amaka O.",
    request: "Please pray for my mother's healing. She was diagnosed with cancer last week and we are trusting God for a miracle.",
    category: "Healing",
    date: "March 13, 2025",
    prayerCount: 47,
  },
  {
    id: "p2",
    name: "David K.",
    request: "I need wisdom as I navigate a major career decision. Pray that God leads me clearly and that I hear His voice.",
    category: "Guidance",
    date: "March 12, 2025",
    prayerCount: 31,
  },
  {
    id: "p3",
    name: "Anonymous",
    request: "Praying for restoration in my marriage. We are going through a very difficult season. Please stand with us in prayer.",
    category: "Family",
    date: "March 12, 2025",
    prayerCount: 62,
  },
  {
    id: "p4",
    name: "Grace T.",
    request: "Please pray for my son who has walked away from the faith. I believe God is not done with him.",
    category: "Salvation",
    date: "March 11, 2025",
    prayerCount: 54,
  },
  {
    id: "p5",
    name: "Emmanuel B.",
    request: "Trusting God for financial breakthrough. I've been unemployed for 6 months. I know God provides.",
    category: "Provision",
    date: "March 11, 2025",
    prayerCount: 38,
  },
  {
    id: "p6",
    name: "Ngozi A.",
    request: "Please pray for peace in my mind. I've been struggling with anxiety and fear. I want to trust God fully.",
    category: "Mental Health",
    date: "March 10, 2025",
    prayerCount: 29,
  },
];

export const prayerCategories = [
  "Healing",
  "Guidance",
  "Family",
  "Salvation",
  "Provision",
  "Mental Health",
  "Other",
];

// ─── MISSIONS ────────────────────────────────────────────────────────────────

export interface Mission {
  id: string;
  title: string;
  location: string;
  region: string;
  description: string;
  goal: number;
  raised: number;
  missionaryName: string;
  missionaryInitials: string;
  status: "Active" | "Completed" | "Upcoming";
  impactStats: { label: string; value: string }[];
}

export const missions: Mission[] = [
  {
    id: "m1",
    title: "Light to Northern Nigeria",
    location: "Kaduna, Nigeria",
    region: "West Africa",
    description:
      "Establishing gospel-preaching churches in unreached communities in Northern Nigeria through church planting, evangelism, and literacy programs.",
    goal: 15000,
    raised: 11200,
    missionaryName: "Deacon Paul Nwosu",
    missionaryInitials: "PN",
    status: "Active",
    impactStats: [
      { label: "Churches Planted", value: "4" },
      { label: "Souls Won", value: "320+" },
      { label: "Communities", value: "12" },
    ],
  },
  {
    id: "m2",
    title: "Hope for East Africa",
    location: "Nairobi, Kenya",
    region: "East Africa",
    description:
      "Partnering with local churches in Kenya to run discipleship programs, women's empowerment, and gospel outreach in urban slums.",
    goal: 12000,
    raised: 8750,
    missionaryName: "Pastor Grace Eze",
    missionaryInitials: "GE",
    status: "Active",
    impactStats: [
      { label: "Disciples Trained", value: "180" },
      { label: "Women Empowered", value: "90" },
      { label: "Churches Supported", value: "6" },
    ],
  },
  {
    id: "m3",
    title: "Gospel to the Nations — Europe",
    location: "London, UK",
    region: "Europe",
    description:
      "Reaching the growing African diaspora in London with the Gospel and raising up leaders who will carry the light back to their home nations.",
    goal: 20000,
    raised: 20000,
    missionaryName: "Pastor Mike Okonkwo",
    missionaryInitials: "MO",
    status: "Completed",
    impactStats: [
      { label: "Lives Reached", value: "500+" },
      { label: "Leaders Raised", value: "35" },
      { label: "Nations Represented", value: "14" },
    ],
  },
  {
    id: "m4",
    title: "Asia Harvest Initiative",
    location: "Mumbai, India",
    region: "South Asia",
    description:
      "Supporting indigenous church planters in rural India with training, resources, and gospel literature in local languages.",
    goal: 18000,
    raised: 4500,
    missionaryName: "Pastor John Adeyemi",
    missionaryInitials: "JA",
    status: "Upcoming",
    impactStats: [
      { label: "Target Villages", value: "25" },
      { label: "Planters Supported", value: "10" },
      { label: "Languages", value: "5" },
    ],
  },
];

export const missionPartners = [
  { name: "Wycliffe Bible Translators", initials: "WB", region: "Global" },
  { name: "Open Doors International", initials: "OD", region: "Persecuted Church" },
  { name: "YWAM Nigeria", initials: "YN", region: "West Africa" },
  { name: "African Enterprise", initials: "AE", region: "Africa" },
];