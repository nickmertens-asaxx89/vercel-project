"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState("login") // login | signup

  async function handleAuth() {
    setLoading(true)

    let result

    if (mode === "signup") {
      result = await supabase.auth.signUp({
        email,
        password,
      })
    } else {
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      })
    }

    const { error } = result
    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAuth} disabled={loading}>
        {loading ? "Loading..." : mode}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        Switch to {mode === "login" ? "Sign Up" : "Login"}
      </p>
    </div>
  )
}