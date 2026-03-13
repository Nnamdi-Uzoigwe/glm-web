export type EventCategory =
  | "All"
  | "Conference"
  | "Outreach"
  | "Training"
  | "Youth"
  | "Special";

export type EventStatus = "Upcoming" | "Past";

export interface Event {
  id: string;
  title: string;
  category: Exclude<EventCategory, "All">;
  date: string; // ISO string e.g. "2025-04-19"
  time: string; // e.g. "10:00 AM - 4:00 PM"
  location: string;
  isOnline: boolean;
  address?: string;
  description: string;
  fullDescription: string;
  host: string;
  hostInitials: string;
  capacity: number;
  registered: number;
  isFree: boolean;
  price?: number;
  tags: string[];
  featured?: boolean;
}

export const events: Event[] = [
  {
    id: "e1",
    title: "Gospel Light Annual Conference 2025",
    category: "Conference",
    date: "2025-04-19",
    time: "9:00 AM – 6:00 PM",
    location: "Gospel Light Ministries Auditorium",
    isOnline: false,
    address: "14 Kingdom Avenue, Lagos, Nigeria",
    description:
      "Our flagship annual gathering — a full day of worship, powerful preaching, ministry training, and kingdom networking.",
    fullDescription:
      "Join us for the Gospel Light Annual Conference 2025 — a Spirit-filled day of encounter, equipping, and commissioning. Speakers from across Africa and beyond will minister on the theme: 'Arise and Shine.' Expect powerful worship, breakout sessions, prophetic ministry, and an evening commissioning service. This is the highlight of our ministry year. All are welcome.",
    host: "Pastor John Adeyemi",
    hostInitials: "JA",
    capacity: 800,
    registered: 612,
    isFree: true,
    tags: ["Worship", "Preaching", "Networking"],
    featured: true,
  },
  {
    id: "e2",
    title: "City Evangelism Outreach — Victoria Island",
    category: "Outreach",
    date: "2025-04-05",
    time: "8:00 AM – 1:00 PM",
    location: "Victoria Island, Lagos",
    isOnline: false,
    address: "Bar Beach, Victoria Island, Lagos",
    description:
      "Join our street evangelism team as we take the Gospel to the heart of Victoria Island. Free gospel tracts and resources provided.",
    fullDescription:
      "This is a hands-on evangelism outreach where our teams will go street by street in Victoria Island sharing the Gospel, praying for the sick, and inviting people to faith in Christ. We will provide training before departure and debrief afterwards. Bring your boldness and expectation — God will move! No experience necessary, just a willing heart.",
    host: "Pastor Mike Okonkwo",
    hostInitials: "MO",
    capacity: 100,
    registered: 78,
    isFree: true,
    tags: ["Evangelism", "Outreach", "Community"],
  },
  {
    id: "e3",
    title: "Leadership & Ministry Training Intensive",
    category: "Training",
    date: "2025-05-10",
    time: "9:00 AM – 5:00 PM",
    location: "Online (Zoom)",
    isOnline: true,
    description:
      "A full-day intensive training for ministry leaders, small group leaders, and those preparing for ministry roles.",
    fullDescription:
      "This intensive training day is designed for current and emerging ministry leaders. Sessions will cover: biblical foundations of leadership, building healthy teams, pastoral care, handling conflict, and sustaining the leader. Led by Pastor Sarah Adeyemi and guest facilitators. A workbook will be provided digitally. This is a paid event — early bird pricing available.",
    host: "Pastor Sarah Adeyemi",
    hostInitials: "SA",
    capacity: 200,
    registered: 95,
    isFree: false,
    price: 25,
    tags: ["Leadership", "Training", "Ministry"],
  },
  {
    id: "e4",
    title: "Youth Fire Night",
    category: "Youth",
    date: "2025-04-26",
    time: "5:00 PM – 9:00 PM",
    location: "Gospel Light Ministries Auditorium",
    isOnline: false,
    address: "14 Kingdom Avenue, Lagos, Nigeria",
    description:
      "A high-energy night of worship, the Word, and ministry specifically for teens and young adults aged 16–30.",
    fullDescription:
      "Youth Fire Night is our monthly gathering for young people who are hungry for God. Expect electric worship, a relevant gospel message, small group discussions, and an altar call. We believe this generation is called to change the world — and this night is a spark. Come as you are. Bring a friend. Don't miss it.",
    host: "Pastor Grace Eze",
    hostInitials: "GE",
    capacity: 300,
    registered: 187,
    isFree: true,
    tags: ["Youth", "Worship", "Gospel"],
    featured: true,
  },
  {
    id: "e5",
    title: "Women of Light Prayer Breakfast",
    category: "Special",
    date: "2025-03-08",
    time: "8:00 AM – 11:00 AM",
    location: "Gospel Light Ministries Hall B",
    isOnline: false,
    address: "14 Kingdom Avenue, Lagos, Nigeria",
    description:
      "A beautiful morning of prayer, worship, and the Word for women of all ages. Breakfast will be served.",
    fullDescription:
      "The Women of Light Prayer Breakfast is a cherished annual gathering that celebrates women and the powerful role they play in God's Kingdom. This year's theme is 'She Rises.' The morning will include worship, a keynote from Pastor Sarah Adeyemi, group prayer, and a time of personal ministry. Breakfast will be served. Dress beautifully and come expectant.",
    host: "Pastor Sarah Adeyemi",
    hostInitials: "SA",
    capacity: 150,
    registered: 150,
    isFree: false,
    price: 10,
    tags: ["Women", "Prayer", "Breakfast"],
  },
  {
    id: "e6",
    title: "Gospel & Culture Forum",
    category: "Special",
    date: "2025-02-22",
    time: "2:00 PM – 5:00 PM",
    location: "Online (YouTube Live)",
    isOnline: true,
    description:
      "A candid panel discussion on navigating faith, culture, and contemporary issues as a Christian in today's world.",
    fullDescription:
      "The Gospel & Culture Forum brings together thinkers, leaders, and believers to explore how the Gospel speaks to contemporary issues — from politics and race, to family and technology. This is an open, thoughtful dialogue. Panelists include Pastor John Adeyemi, a social commentator, and a marketplace leader. Submit your questions in advance via our website.",
    host: "Pastor John Adeyemi",
    hostInitials: "JA",
    capacity: 500,
    registered: 312,
    isFree: true,
    tags: ["Culture", "Gospel", "Discussion"],
  },
];

export const eventCategories: EventCategory[] = [
  "All",
  "Conference",
  "Outreach",
  "Training",
  "Youth",
  "Special",
];

export function isUpcoming(event: Event): boolean {
  return new Date(event.date) >= new Date(new Date().toDateString());
}

export function getNextEvent(): Event | undefined {
  return events
    .filter(isUpcoming)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
}