"use client"

import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div style={styles.wrapper}>
      
      <div style={styles.container}>

        <h1 style={styles.title}>
          Expense Tracker
        </h1>

        <p style={styles.subtitle}>
          Track your spending, analyze your habits, and stay in control of your money.
        </p>

        <div style={{ display: "flex", justifyContent: "center",  gap: 10 }}>
          <button
            onClick={() => router.push("/login")}
            style={styles.primaryBtn}
          >
            Get Started
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center",  gap: 10 }}>
          <button
            onClick={() => router.push("/privacy")}
            style={styles.secondaryBtn}
          >
            Privacy Agreement
          </button>
        </div>

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

  container: {
    textAlign: "center",
    maxWidth: 600,
  },

  title: {
    fontSize: 48,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },

  primaryBtn: {
    padding: "12px 18px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },

  secondaryBtn: {
    padding: "12px 18px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: 10,
    cursor: "pointer",
  },
}
