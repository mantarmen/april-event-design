"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  defaultSiteContent,
  SITE_CONTENT_KEY,
  type SiteContent,
} from "@/app/lib/site-data"

export default function AdminContentPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [form, setForm] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")

    if (!isAdmin) {
      router.push("/admin/login")
      return
    }

    const savedContent = localStorage.getItem(SITE_CONTENT_KEY)

    if (savedContent) {
      setForm(JSON.parse(savedContent))
    } else {
      localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(defaultSiteContent))
    }

    setReady(true)
  }, [router])

  const updateField = (key: keyof SiteContent, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(form))
    alert("Content saved!")
  }

  if (!ready) return null

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Content Manager
          </p>
          <h1 className="text-3xl font-semibold">Homepage Content</h1>
          <p className="mt-3 text-white/60">
            Edit the main text areas shown on the public website.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Hero Section</h2>

            <label className="mb-2 block text-sm text-white/70">Hero Title</label>
            <input
              value={form.heroTitle}
              onChange={(e) => updateField("heroTitle", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">
              Hero Subtitle
            </label>
            <textarea
              value={form.heroSubtitle}
              onChange={(e) => updateField("heroSubtitle", e.target.value)}
              className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">
              Button Text
            </label>
            <input
              value={form.heroButtonText}
              onChange={(e) => updateField("heroButtonText", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Services Section</h2>

            <label className="mb-2 block text-sm text-white/70">Title</label>
            <input
              value={form.servicesTitle}
              onChange={(e) => updateField("servicesTitle", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">Text</label>
            <textarea
              value={form.servicesText}
              onChange={(e) => updateField("servicesText", e.target.value)}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">About Section</h2>

            <label className="mb-2 block text-sm text-white/70">Title</label>
            <input
              value={form.aboutTitle}
              onChange={(e) => updateField("aboutTitle", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">Text</label>
            <textarea
              value={form.aboutText}
              onChange={(e) => updateField("aboutText", e.target.value)}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Contact Section</h2>

            <label className="mb-2 block text-sm text-white/70">Title</label>
            <input
              value={form.contactTitle}
              onChange={(e) => updateField("contactTitle", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">Text</label>
            <textarea
              value={form.contactText}
              onChange={(e) => updateField("contactText", e.target.value)}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-fit rounded-full bg-white px-6 py-3 font-medium text-black"
          >
            Save Content
          </button>
        </div>
      </div>
    </main>
  )
}