"use client"

import { useEffect, useState } from "react"
import {
  defaultSiteContent,
  SITE_CONTENT_KEY,
  type SiteContent,
} from "@/app/lib/site-data"

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => {
    const savedContent = localStorage.getItem(SITE_CONTENT_KEY)

    if (savedContent) {
      setForm(JSON.parse(savedContent))
    } else {
      localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(defaultSiteContent))
    }
  }, [])

  const updateField = (key: keyof SiteContent, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(form))
    alert("Settings saved!")
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Settings
          </p>
          <h1 className="text-3xl font-semibold">Brand & Site Appearance</h1>
          <p className="mt-3 max-w-2xl text-white/60">
            Update your contact details, wallpaper, background color, and site font style.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Business Details</h2>

            <label className="mb-2 block text-sm text-white/70">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">Email</label>
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">
              Instagram URL
            </label>
            <input
              value={form.instagram}
              onChange={(e) => updateField("instagram", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Background</h2>

            <label className="mb-2 block text-sm text-white/70">
              Background Color
            </label>
            <input
              type="color"
              value={form.backgroundColor}
              onChange={(e) => updateField("backgroundColor", e.target.value)}
              className="h-14 w-28 rounded-xl border border-white/10 bg-black p-2"
            />

            <label className="mb-2 mt-5 block text-sm text-white/70">
              Wallpaper Image URL
            </label>
            <input
              value={form.backgroundImage}
              onChange={(e) => updateField("backgroundImage", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="https://your-image-link.com/image.jpg"
            />

            <p className="mt-3 text-sm text-white/45">
              Unsplash or direct image links work best here.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-5 text-xl font-medium">Typography</h2>

            <label className="mb-2 block text-sm text-white/70">
              Site Font Style
            </label>
            <select
              value={form.fontFamily}
              onChange={(e) => updateField("fontFamily", e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option value="playfair-inter">Playfair Display + Inter</option>
              <option value="poppins">Poppins</option>
              <option value="cormorant-inter">Cormorant Garamond + Inter</option>
              <option value="inter">Inter</option>
            </select>

            <p className="mt-3 text-sm text-white/45">
              Playfair and Cormorant feel more elegant. Poppins and Inter feel more modern.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-fit rounded-full bg-white px-6 py-3 font-medium text-black"
          >
            Save Settings
          </button>
        </div>
      </div>
    </main>
  )
}