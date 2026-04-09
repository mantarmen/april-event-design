"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const cards = [
  {
    title: "Homepage Content",
    description: "Edit hero, services, about, and contact section content.",
    href: "/admin/content",
  },
  {
    title: "Gallery",
    description: "Add image links and update gallery titles.",
    href: "/admin/gallery",
  },
  {
    title: "Contact Messages",
    description: "View messages sent from the website contact form.",
    href: "/admin/contact",
  },
  {
    title: "Settings",
    description: "Update phone, email, wallpaper, colors, and font style.",
    href: "/admin/settings",
  },
]

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Admin Panel
          </p>
          <h1 className="text-4xl font-semibold">April Event Design Admin</h1>
          <p className="mt-3 max-w-2xl text-white/60">
            Manage your homepage content, gallery visuals, contact messages, and business details here.
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin")
              router.push("/admin/login")
            }}
            className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/80"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <h2 className="text-xl font-medium">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}