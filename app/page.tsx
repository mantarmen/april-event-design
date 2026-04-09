"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Inter,
  Playfair_Display,
  Poppins,
  Cormorant_Garamond,
} from "next/font/google"
import {
  defaultGallery,
  defaultSiteContent,
  GALLERY_KEY,
  SITE_CONTENT_KEY,
  type GalleryItem,
  type SiteContent,
} from "./lib/site-data"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

type InquiryForm = {
  name: string
  email: string
  eventDate: string
  eventType: string
  message: string
}

const defaultForm: InquiryForm = {
  name: "",
  email: "",
  eventDate: "",
  eventType: "",
  message: "",
}

export default function Home() {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent)
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState<InquiryForm>(defaultForm)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const savedContent = localStorage.getItem(SITE_CONTENT_KEY)
    const savedGallery = localStorage.getItem(GALLERY_KEY)

    if (savedContent) {
      setSiteContent(JSON.parse(savedContent))
    }

    if (savedGallery) {
      setGallery(JSON.parse(savedGallery))
    } else {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultGallery))
    }
  }, [])

  const fontClass = useMemo(() => {
    switch (siteContent.fontFamily) {
      case "poppins":
        return poppins.className
      case "cormorant-inter":
        return cormorant.className
      case "inter":
        return inter.className
      case "playfair-inter":
      default:
        return playfair.className
    }
  }, [siteContent.fontFamily])

  const bodyFontClass = useMemo(() => {
    switch (siteContent.fontFamily) {
      case "poppins":
        return poppins.className
      case "cormorant-inter":
      case "playfair-inter":
      case "inter":
      default:
        return inter.className
    }
  }, [siteContent.fontFamily])

  const mainStyle = {
    backgroundColor: siteContent.backgroundColor || "#000000",
    backgroundImage: siteContent.backgroundImage
      ? `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.72)), url(${siteContent.backgroundImage})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed" as const,
  }

  const closeMenu = () => setMenuOpen(false)

  const updateForm = (key: keyof InquiryForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.eventDate.trim() ||
      !form.eventType.trim() ||
      !form.message.trim()
    ) {
      setErrorMessage("Please fill out all fields.")
      return
    }

    const existing = localStorage.getItem("aprileventdesign-contact-messages")
    const parsed = existing ? JSON.parse(existing) : []

    const newInquiry = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      eventDate: form.eventDate,
      eventType: form.eventType,
      message: form.message,
      createdAt: new Date().toISOString(),
      status: "new",
    }

    const updated = [newInquiry, ...parsed]
    localStorage.setItem(
      "aprileventdesign-contact-messages",
      JSON.stringify(updated)
    )

    setForm(defaultForm)
    setSuccessMessage("Your inquiry has been sent successfully.")
  }

  return (
    <main className={`${bodyFontClass} text-white`} style={mainStyle}>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/45 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#home" className="text-base font-semibold tracking-wide sm:text-lg">
            April Event Design
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#gallery" className="transition hover:text-white">
              Gallery
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 md:hidden"
            aria-label="Open menu"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-white/85">
              <a href="#services" onClick={closeMenu} className="py-1">
                Services
              </a>
              <a href="#gallery" onClick={closeMenu} className="py-1">
                Gallery
              </a>
              <a href="#about" onClick={closeMenu} className="py-1">
                About
              </a>
              <a href="#contact" onClick={closeMenu} className="py-1">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 text-center sm:px-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/50 sm:text-sm">
            Premium Event Design & Rentals
          </p>

          <h1 className={`${fontClass} text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl`}>
            {siteContent.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8 md:text-xl">
            {siteContent.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={siteContent.heroButtonLink}
              className="w-full rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:opacity-90 sm:w-auto"
            >
              {siteContent.heroButtonText}
            </a>
            <a
              href="#gallery"
              className="w-full rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:border-white/40 sm:w-auto"
            >
              View Gallery
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 bg-black/35 px-5 py-20 backdrop-blur-[2px] sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
              Services
            </p>
            <h2 className={`${fontClass} text-3xl font-semibold sm:text-4xl md:text-5xl`}>
              {siteContent.servicesTitle}
            </h2>
          </div>

          <div>
            <p className="text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              {siteContent.servicesText}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Wedding Design",
                "Baby Showers & Sprinkles",
                "Luxury Table Styling",
                "Backdrop & Decor Styling",
                "Rental Coordination",
                "Private Event Setup",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-base font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t border-white/10 bg-black/30 px-5 py-20 backdrop-blur-[2px] sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
              Gallery
            </p>
            <h2 className={`${fontClass} text-3xl font-semibold sm:text-4xl md:text-5xl`}>
              Inspired Event Moments
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/65 sm:text-lg">
              A curated look at the kind of polished, elevated atmosphere we help create.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover sm:h-80"
                />
                <div className="p-5">
                  <p className="text-base font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 bg-black/35 px-5 py-20 backdrop-blur-[2px] sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
              About
            </p>
            <h2 className={`${fontClass} text-3xl font-semibold sm:text-4xl md:text-5xl`}>
              {siteContent.aboutTitle}
            </h2>
          </div>

          <div>
            <p className="text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              {siteContent.aboutText}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/50">Style</p>
                <p className="mt-2 text-lg font-medium">Elegant & Refined</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/50">Approach</p>
                <p className="mt-2 text-lg font-medium">Tailored & Warm</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/50">Focus</p>
                <p className="mt-2 text-lg font-medium">Detail-Driven</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-black/30 px-5 py-20 backdrop-blur-[2px] sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
                Contact
              </p>
              <h2 className={`${fontClass} text-3xl font-semibold sm:text-4xl md:text-5xl`}>
                {siteContent.contactTitle}
              </h2>
              <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                {siteContent.contactText}
              </p>

              <div className="mt-8 space-y-3 text-white/75">
                <p>{siteContent.phone}</p>
                <p>{siteContent.email}</p>
                <a
                  href={siteContent.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-white underline underline-offset-4"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <form className="grid gap-4" onSubmit={handleInquirySubmit}>
                <input
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
                  placeholder="Your Name"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
                  placeholder="Email Address"
                />

                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => updateForm("eventDate", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
                />

                <input
                  value={form.eventType}
                  onChange={(e) => updateForm("eventType", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
                  placeholder="Event Type"
                />

                <textarea
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                  className="min-h-[140px] rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
                  placeholder="Tell us about your vision..."
                />

                {errorMessage && (
                  <p className="text-sm text-red-400">{errorMessage}</p>
                )}

                {successMessage && (
                  <p className="text-sm text-green-400">{successMessage}</p>
                )}

                <button
                  type="submit"
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40 px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 April Event Design</p>
          <p>Premium Event Design & Rentals</p>
        </div>
      </footer>
    </main>
  )
}