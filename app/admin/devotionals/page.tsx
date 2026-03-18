import { db } from "@/db";
import { devotionals } from "@/db/schema";
import { toggleDevotionalPublished, deleteDevotional } from "@/app/actions/devotionals";

export default async function AdminDevotionalsPage() {
  const all = await db
    .select()
    .from(devotionals)
    .orderBy(devotionals.createdAt);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Devotionals</h1>
          <p className="text-gray-400 text-sm">{all.length} devotional{all.length !== 1 ? "s" : ""} total</p>
        </div>
        <a
          href="/admin/devotionals/new"
          className="bg-[#1B3A6B] hover:bg-[#C9902A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300"
        >
          + New Devotional
        </a>
      </div>

      {all.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <p className="text-4xl mb-4">📖</p>
          <h3 className="font-serif text-[#1B3A6B] text-xl mb-2">No devotionals yet</h3>
          <p className="text-gray-400 text-sm mb-6">Create your first devotional to get started.</p>
          <a href="/admin/devotionals/new" className="inline-block bg-[#1B3A6B] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#C9902A] transition-all duration-300">
            Create Devotional →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-4">Title</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Scripture</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Author</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {all.map((dev) => (
                <tr key={dev.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1B3A6B] line-clamp-1">{dev.title}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{dev.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{dev.scripture}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{dev.author}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dev.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {dev.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <a href={`/admin/devotionals/${dev.id}/edit`} className="text-xs text-[#1B3A6B] hover:text-[#C9902A] font-semibold transition-colors">
                        Edit
                      </a>
                      <span className="text-gray-200">|</span>
                      <form action={toggleDevotionalPublished.bind(null, dev.id, dev.published)}>
                        <button type="submit" className="text-xs text-gray-400 hover:text-[#1B3A6B] font-semibold transition-colors">
                          {dev.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <span className="text-gray-200">|</span>
                      <form action={deleteDevotional.bind(null, dev.id)}>
                        <button type="submit" className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}