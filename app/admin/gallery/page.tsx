"use client"

import { useEffect, useState } from "react"
import {
  defaultGallery,
  GALLERY_KEY,
  type GalleryItem,
} from "@/app/lib/site-data"

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery)
  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    const savedGallery = localStorage.getItem(GALLERY_KEY)

    if (savedGallery) {
      setGallery(JSON.parse(savedGallery))
    } else {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultGallery))
    }
  }, [])

  const saveGallery = (items: GalleryItem[]) => {
    setGallery(items)
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items))
  }

  const addItem = () => {
    if (!image.trim() || !title.trim()) {
      alert("Please add both image URL and title.")
      return
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      image,
      title,
    }

    const updated = [newItem, ...gallery]
    saveGallery(updated)
    setImage("")
    setTitle("")
  }

  const removeItem = (id: string) => {
    const updated = gallery.filter((item) => item.id !== id)
    saveGallery(updated)
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Gallery Manager
          </p>
          <h1 className="text-3xl font-semibold">Gallery</h1>
          <p className="mt-3 text-white/60">
            Add image URLs and titles to control the gallery shown on the homepage.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <label className="mb-2 block text-sm text-white/70">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="https://..."
          />

          <label className="mb-2 mt-5 block text-sm text-white/70">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Elegant Tablescape Styling"
          />

          <button
            onClick={addItem}
            className="mt-6 rounded-full bg-white px-6 py-3 font-medium text-black"
          >
            Add Gallery Item
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-5">
                <p className="font-medium">{item.title}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}