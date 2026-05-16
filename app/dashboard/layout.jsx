"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DashboardLayout({ children }) {
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: 240,
        background: "#0f172a",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        
        <div>
          <h2 style={{ marginBottom: 30 }}>Expense Tracker</h2>

          <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NavItem href="/dashboard" label="Overview" />
            <NavItem href="/dashboard/expenses" label="Expenses" />
            <NavItem href="/dashboard/analytics" label="Analytics" />
          </nav>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            color: "white",
            padding: "10px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={{
        flex: 1,
        padding: 30,
        overflowY: "auto"
      }}>
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, label }) {
  return (
    <Link href={href}>
      <div style={{
        padding: "10px 12px",
        borderRadius: 8,
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer"
      }}>
        {label}
      </div>
    </Link>
  )
}