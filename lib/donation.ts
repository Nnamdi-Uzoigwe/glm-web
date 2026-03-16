export type DonationCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  goal?: number;
  raised?: number;
};

export type DonationFrequency = "one-time" | "monthly" | "annually";

export const donationCategories: DonationCategory[] = [
  {
    id: "general",
    title: "General Fund",
    description: "Support the overall mission and day-to-day operations of Gospel Light Ministries.",
    icon: "🏛️",
  },
  {
    id: "missions",
    title: "Missions & Outreach",
    description: "Fund evangelism teams, city outreaches, and gospel missions across Africa and beyond.",
    icon: "🌍",
    goal: 50000,
    raised: 31200,
  },
  {
    id: "building",
    title: "Building Fund",
    description: "Help us build a larger auditorium to accommodate our growing congregation.",
    icon: "🏗️",
    goal: 200000,
    raised: 87500,
  },
  {
    id: "youth",
    title: "Youth Ministry",
    description: "Equip the next generation — fund youth programs, camps, and discipleship resources.",
    icon: "⚡",
    goal: 20000,
    raised: 14800,
  },
  {
    id: "media",
    title: "Media & Technology",
    description: "Keep our sermons, courses, and resources freely available online to the world.",
    icon: "📡",
    goal: 15000,
    raised: 9300,
  },
  {
    id: "welfare",
    title: "Welfare & Care",
    description: "Support widows, orphans, and members of our community facing hardship.",
    icon: "🤝",
  },
];

export const suggestedAmounts = [10, 25, 50, 100, 250, 500];

export const impactStats = [
  { value: "50+", label: "Nations Reached" },
  { value: "12K+", label: "Lives Impacted" },
  { value: "₦2.1M", label: "Welfare Given" },
  { value: "200+", label: "Missionaries Sent" },
];