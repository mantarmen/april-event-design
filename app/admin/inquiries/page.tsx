import Link from "next/link"

const cards = [
  {
    title: "Homepage Content",
    description:
      "Edit hero text, about section, services, and contact content.",
    href: "/admin/content",
  },
  {
    title: "Gallery",
    description:
      "Upload images, remove visuals, and control gallery order.",
    href: "/admin/gallery",
  },
  {
    title: "Inquiries",
    description:
      "View quote requests and track customer follow-up status.",
    href: "/admin/inquiries",
  },
  {
    title: "Settings",
    description:
      "Update contact details, social links, and basic brand settings.",
    href: "/admin/settings",
  },
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Admin Panel
          </p>
          <h1 className="text-4xl font-semibold">April Event Design Admin</h1>
          <p className="mt-3 text-white/60">
            Gallery, homepage content, inquiries, and site settings will be managed here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <h2 className="text-lg font-medium">{card.title}</h2>
              <p className="mt-2 text-sm text-white/60">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}