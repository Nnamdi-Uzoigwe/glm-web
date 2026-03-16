// import {
//   boolean,
//   timestamp,
//   pgTable,
//   text,
//   primaryKey,
//   integer,
//   uuid,
// } from "drizzle-orm/pg-core";
// import type { AdapterAccountType } from "next-auth/adapters";

// // ─── USERS ────────────────────────────────────────────────────────────────────
// export const users = pgTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email").unique(),
//   emailVerified: timestamp("emailVerified", { mode: "date" }),
//   image: text("image"),
//   password: text("password"), // only set for email/password accounts
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// // ─── ACCOUNTS (OAuth) ─────────────────────────────────────────────────────────
// export const accounts = pgTable(
//   "account",
//   {
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     type: text("type").$type<AdapterAccountType>().notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => [
//     primaryKey({ columns: [account.provider, account.providerAccountId] }),
//   ]
// );

// // ─── SESSIONS ─────────────────────────────────────────────────────────────────
// export const sessions = pgTable("session", {
//   sessionToken: text("sessionToken").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// // ─── VERIFICATION TOKENS ──────────────────────────────────────────────────────
// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
// );

// // ─── PURCHASES ────────────────────────────────────────────────────────────────
// export const purchases = pgTable("purchase", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   courseId: text("courseId").notNull(),
//   courseTitle: text("courseTitle").notNull(),
//   amountPaid: integer("amountPaid").notNull().default(0), // in cents
//   completedLessons: text("completedLessons").array().default([]),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });



import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── ENUMS ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const courseLevelEnum = pgEnum("course_level", ["Beginner", "Intermediate", "Advanced"]);

// ─── USERS ────────────────────────────────────────────────────────────────────
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── ACCOUNTS (OAuth) ─────────────────────────────────────────────────────────
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

// ─── SESSIONS ─────────────────────────────────────────────────────────────────
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ─── VERIFICATION TOKENS ──────────────────────────────────────────────────────
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── COURSES ──────────────────────────────────────────────────────────────────
export const courses = pgTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  instructor: text("instructor").notNull(),
  instructorBio: text("instructor_bio"),
  category: text("category").notNull(),
  level: courseLevelEnum("level").default("Beginner").notNull(),
  price: integer("price").notNull().default(0),
  isFree: boolean("is_free").default(false).notNull(),
  thumbnailUrl: text("thumbnail_url"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── LESSONS ──────────────────────────────────────────────────────────────────
export const lessons = pgTable("lesson", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  cloudinaryPublicId: text("cloudinary_public_id").notNull(),
  duration: integer("duration"),
  order: integer("order").notNull().default(0),
  isFreePreview: boolean("is_free_preview").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── PURCHASES ────────────────────────────────────────────────────────────────
export const purchases = pgTable("purchase", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: uuid("courseId")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  courseTitle: text("courseTitle").notNull(),
  amountPaid: integer("amountPaid").notNull().default(0),
  paystackReference: text("paystack_reference").unique(),
  completedLessons: text("completedLessons").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});