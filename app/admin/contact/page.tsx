"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type ContactMessage = {
  id: string
  name: string
  email: string
  eventDate: string
  eventType: string
  message: string
  createdAt: string
  status: string
}

export default function AdminContactPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")

    if (!isAdmin) {
      router.push("/admin/login")
      return
    }

    const savedMessages = localStorage.getItem("aprileventdesign-contact-messages")
    const parsed = savedMessages ? JSON.parse(savedMessages) : []
    setMessages(parsed)
    setReady(true)
  }, [router])

  const deleteMessage = (id: string) => {
    const updated = messages.filter((item) => item.id !== id)
    setMessages(updated)
    localStorage.setItem(
      "aprileventdesign-contact-messages",
      JSON.stringify(updated)
    )
  }

  if (!ready) return null

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">
            Contact Messages
          </p>
          <h1 className="text-3xl font-semibold">Inbox</h1>
          <p className="mt-3 text-white/60">
            Messages submitted through the website contact form appear here.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/60">
            No contact messages yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-medium">{item.name}</h2>
                    <p className="mt-1 text-sm text-white/60">{item.email}</p>
                  </div>

                  <div className="text-sm text-white/50">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Event Date
                    </p>
                    <p className="mt-2">{item.eventDate}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Event Type
                    </p>
                    <p className="mt-2">{item.eventType}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Message
                  </p>
                  <p className="mt-2 whitespace-pre-line text-white/80">
                    {item.message}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(item.id)}
                  className="mt-6 rounded-full border border-red-400/30 px-5 py-2 text-sm text-red-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}