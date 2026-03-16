"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Lesson {
  id?: string;
  title: string;
  description: string;
  isFreePreview: boolean;
  cloudinaryPublicId: string;
  order: number;
  uploading?: boolean;
  uploadProgress?: number;
  uploaded?: boolean;
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    fullDescription: "",
    instructor: "",
    instructorBio: "",
    category: "",
    level: "Beginner",
    price: "",
    isFree: false,
    published: false,
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Fetch existing course data
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/admin/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();

        setForm({
          title: data.course.title,
          slug: data.course.slug,
          description: data.course.description,
          fullDescription: data.course.fullDescription ?? "",
          instructor: data.course.instructor,
          instructorBio: data.course.instructorBio ?? "",
          category: data.course.category,
          level: data.course.level,
          price: data.course.isFree ? "" : String(data.course.price / 100),
          isFree: data.course.isFree,
          published: data.course.published,
        });

        setLessons(
          data.lessons.map((l: Lesson) => ({
            ...l,
            uploading: false,
            uploadProgress: 0,
            uploaded: true,
          }))
        );
      } catch {
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const setField = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const updateLesson = (index: number, field: keyof Lesson, value: unknown) => {
    setLessons((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  // const uploadVideo = async (index: number, file: File) => {
  //   updateLesson(index, "uploading", true);
  //   updateLesson(index, "uploadProgress", 0);

  //   try {
  //     const sigRes = await fetch("/api/cloudinary/signature", { method: "POST" });
  //     const { signature, timestamp, apiKey, cloudName, folder } = await sigRes.json();

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("signature", signature);
  //     formData.append("timestamp", timestamp);
  //     formData.append("api_key", apiKey);
  //     formData.append("folder", folder);

  //     const xhr = new XMLHttpRequest();
  //     xhr.upload.onprogress = (e) => {
  //       if (e.lengthComputable) {
  //         updateLesson(index, "uploadProgress", Math.round((e.loaded / e.total) * 100));
  //       }
  //     };

  //     await new Promise<void>((resolve, reject) => {
  //       xhr.onload = () => {
  //         if (xhr.status === 200) {
  //           const data = JSON.parse(xhr.responseText);
  //           updateLesson(index, "cloudinaryPublicId", data.public_id);
  //           updateLesson(index, "uploaded", true);
  //           resolve();
  //         } else reject(new Error("Upload failed"));
  //       };
  //       xhr.onerror = () => reject(new Error("Upload failed"));
  //       xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
  //       xhr.send(formData);
  //     });
  //   } catch {
  //     setError("Video upload failed. Please try again.");
  //   } finally {
  //     updateLesson(index, "uploading", false);
  //   }
  // };

  const uploadVideo = async (index: number, file: File) => {
  setLessons((prev) => prev.map((l, i) =>
    i === index ? { ...l, uploading: true, uploadProgress: 0 } : l
  ));

  try {
    const sigRes = await fetch("/api/cloudinary/signature", { method: "POST" });
    const { signature, timestamp, apiKey, cloudName, folder } = await sigRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("folder", folder);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setLessons((prev) => prev.map((l, i) =>
          i === index ? { ...l, uploadProgress: pct } : l
        ));
      }
    };

    await new Promise<void>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log("Cloudinary public_id:", data.public_id);
          setLessons((prev) => prev.map((l, i) =>
            i === index
              ? { ...l, cloudinaryPublicId: data.public_id, uploaded: true, uploading: false }
              : l
          ));
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
      xhr.send(formData);
    });

  } catch (err) {
    console.error("Upload error:", err);
    setLessons((prev) => prev.map((l, i) =>
      i === index ? { ...l, uploading: false } : l
    ));
    setError("Video upload failed. Please try again.");
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

     // Block if any lesson is still uploading
  const stillUploading = lessons.some((l) => l.uploading);
  if (stillUploading) {
    setError("Please wait for all videos to finish uploading.");
    return;
  }

  // Block if any lesson has no video
  const missingVideo = lessons.some((l) => !l.cloudinaryPublicId);
  if (missingVideo) {
    setError("Please upload a video for every lesson before saving.");
    return;
  }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.isFree ? 0 : Math.round(parseFloat(form.price) * 100),
          lessons: lessons.map((l, i) => ({
            id: l.id,
            title: l.title,
            description: l.description,
            isFreePreview: l.isFreePreview,
            cloudinaryPublicId: l.cloudinaryPublicId,
            order: i,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save");
        return;
      }

      router.push("/admin/courses");
    } catch {
      setError("Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/25 focus:border-[#1B3A6B] transition-all duration-200";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="w-8 h-8 animate-spin text-[#1B3A6B]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[#1B3A6B] text-3xl mb-1">Edit Course</h1>
          <p className="text-gray-400 text-sm">{form.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${form.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {form.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-[#1B3A6B] text-xl mb-5">Course Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Course Title *</label>
              <input type="text" required value={form.title} onChange={setField("title")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Slug</label>
              <input type="text" required value={form.slug} onChange={setField("slug")} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category *</label>
              <select required value={form.category} onChange={setField("category")} className={inputClass}>
                <option value="">Select category…</option>
                {["Gospel", "Evangelism", "Prayer", "Leadership", "Discipleship", "Bible Study"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Level *</label>
              <select required value={form.level} onChange={setField("level")} className={inputClass}>
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Instructor *</label>
              <input type="text" required value={form.instructor} onChange={setField("instructor")} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Short Description *</label>
              <input type="text" required value={form.description} onChange={setField("description")} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Description</label>
              <textarea rows={4} value={form.fullDescription} onChange={setField("fullDescription")} className={`${inputClass} resize-none`} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Instructor Bio</label>
              <textarea rows={2} value={form.instructorBio} onChange={setField("instructorBio")} className={`${inputClass} resize-none`} />
            </div>

            {/* Pricing */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input type="checkbox" checked={form.isFree} onChange={setField("isFree")} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                <span className="text-sm font-medium text-gray-700">This course is free</span>
              </label>
              {!form.isFree && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Price (₦)</label>
                  <input type="number" min="1" value={form.price} onChange={setField("price")} className={inputClass} />
                </div>
              )}
            </div>

            {/* Published toggle */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={setField("published")} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                <span className="text-sm font-medium text-gray-700">Published (visible to public)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-[#1B3A6B] text-xl">Lessons</h2>
            <button
              type="button"
              onClick={() => setLessons((prev) => [...prev, {
                title: "", description: "", isFreePreview: false,
                cloudinaryPublicId: "", order: prev.length,
                uploading: false, uploadProgress: 0, uploaded: false,
              }])}
              className="text-sm text-[#1B3A6B] hover:text-[#C9902A] font-semibold transition-colors"
            >
              + Add Lesson
            </button>
          </div>

          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-[#1B3A6B]">Lesson {index + 1}</p>
                  {lessons.length > 1 && (
                    <button type="button" onClick={() => setLessons((prev) => prev.filter((_, i) => i !== index))} className="text-xs text-red-400 hover:text-red-600 transition-colors">
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Lesson Title *</label>
                    <input type="text" required value={lesson.title} onChange={(e) => updateLesson(index, "title", e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Description</label>
                    <input type="text" value={lesson.description} onChange={(e) => updateLesson(index, "description", e.target.value)} className={inputClass} />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input type="checkbox" checked={lesson.isFreePreview} onChange={(e) => updateLesson(index, "isFreePreview", e.target.checked)} className="w-4 h-4 rounded accent-[#1B3A6B]" />
                  <span className="text-xs text-gray-500">Free preview</span>
                </label>

                {/* Video status */}
                {lesson.uploaded && lesson.cloudinaryPublicId ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-green-700 font-medium">Video uploaded</span>
                    </div>
                    <label className="text-xs text-[#1B3A6B] hover:text-[#C9902A] cursor-pointer font-semibold transition-colors">
                      Replace video
                      <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) { updateLesson(index, "uploaded", false); uploadVideo(index, file); }
                      }} />
                    </label>
                  </div>
                ) : lesson.uploading ? (
                  <div className="bg-[#1B3A6B]/5 border border-[#1B3A6B]/10 rounded-xl px-4 py-3">
                    <div className="flex justify-between text-xs text-[#1B3A6B] font-medium mb-2">
                      <span>Uploading…</span>
                      <span>{lesson.uploadProgress ?? 0}%</span>
                    </div>
                    <div className="w-full bg-[#1B3A6B]/10 rounded-full h-1.5">
                      <div className="h-1.5 bg-[#1B3A6B] rounded-full transition-all" style={{ width: `${lesson.uploadProgress ?? 0}%` }} />
                    </div>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 cursor-pointer hover:border-[#1B3A6B]/40 transition-all">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-400">Click to upload video</span>
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadVideo(index, file);
                    }} />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="flex-1 bg-[#1B3A6B] hover:bg-[#C9902A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : "Save Changes"}
          </button>
          <a href="/admin/courses" className="px-6 py-3.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:border-gray-300 transition-all">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}