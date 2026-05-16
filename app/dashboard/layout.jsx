"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DashboardLayout({ children }) {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div style={styles.container}>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          style={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,

          // MOBILE SLIDE EFFECT
          left: open ? 0 : -260,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 30 }}>
            💰 Expense SaaS
          </h2>

          <nav style={styles.nav}>
            <NavItem href="/dashboard" label="Overview" />
            <NavItem href="/dashboard/expenses" label="Expenses" />
            <NavItem href="/dashboard/analytics" label="Analytics" />
          </nav>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        {/* TOPBAR */}
        <div style={styles.topbar}>

          {/* HAMBURGER */}
          <button
            style={styles.menuBtn}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <h3 style={{ margin: 0 }}>
            Dashboard
          </h3>
        </div>

        {children}
      </main>
    </div>
  )
}

function NavItem({ href, label }) {
  return (
    <Link href={href}>
      <div style={styles.navItem}>
        {label}
      </div>
    </Link>
  )
}

/* STYLES */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f6f7fb",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 20,
  },

  sidebar: {
    width: 240,
    background: "#0f172a",
    color: "white",
    padding: 20,

    position: "fixed",
    top: 0,
    bottom: 0,

    zIndex: 30,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    transition: "left 0.25s ease",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  navItem: {
    padding: "10px 12px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.05)",
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: 20,
    width: "100%",
  
    // desktop sidebar space
    marginLeft:
      typeof window !== "undefined" &&
      window.innerWidth >= 768
        ? 240
        : 0,
  },

  topbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  menuBtn: {
    fontSize: 20,
    border: "none",
    background: "white",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
  },
}
