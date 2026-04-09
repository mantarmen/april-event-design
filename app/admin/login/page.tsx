"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true")
      router.push("/admin")
    } else {
      setError("Wrong username or password")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-6 text-center text-2xl font-semibold">Admin Login</h1>

        <input
          className="mb-4 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="mb-4 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-white py-3 font-medium text-black"
        >
          Login
        </button>
      </div>
    </main>
  )
}