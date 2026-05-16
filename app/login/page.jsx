"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState("login")

  async function handleAuth() {
    setLoading(true)

    let result

    if (mode === "signup") {
      result = await supabase.auth.signUp({ email, password })
    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
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
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

        <p style={styles.subtitle}>
          Sign in to your expense dashboard
        </p>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }
          style={styles.switch}
        >
          {mode === "login"
            ? "No account? Create one"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  },

  card: {
    width: 360,
    padding: 30,
    borderRadius: 16,
    background: "white",
    border: "1px solid #eee",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: 24,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#666",
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: 10,
    marginTop: 10,
    fontWeight: "bold",
  },

  switch: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 13,
    color: "#4f46e5",
    cursor: "pointer",
  },
}