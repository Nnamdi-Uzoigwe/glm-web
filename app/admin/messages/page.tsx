import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { markMessageRead } from "@/app/actions/contact";

export default async function AdminMessagesPage() {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Messages</h1>
          <p className="text-gray-400 text-sm">
            {messages.length} total
            {unread > 0 && (
              <span className="ml-2 text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                {unread} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">✉️</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No messages yet</h3>
          <p className="text-gray-400 text-sm">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-2xl border p-6 transition-all ${msg.read ? "border-gray-100" : "border-[#1B3A6B]/20 shadow-sm"}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${msg.read ? "bg-gray-100 text-gray-400" : "bg-[#1B3A6B] text-white"}`}>
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800">{msg.name}</p>
                      {!msg.read && (
                        <span className="text-xs font-semibold bg-[#1B3A6B] text-white px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{msg.email}{msg.phone ? ` · ${msg.phone}` : ""}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <span className="text-xs bg-[#1B3A6B]/8 text-[#1B3A6B] px-2.5 py-0.5 rounded-full mt-1 inline-block">{msg.subject}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 mb-3">
                {msg.message}
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="text-xs font-semibold text-[#1B3A6B] hover:text-[#C9902A] transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Reply via Email
                </a>
                {!msg.read && (
                  <>
                    <span className="text-gray-200">|</span>
                    <form action={markMessageRead.bind(null, msg.id)}>
                      <button type="submit" className="text-xs text-gray-400 hover:text-[#1B3A6B] font-semibold transition-colors">
                        Mark as Read
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}