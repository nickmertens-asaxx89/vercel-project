"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Analytics() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase.from("expenses").select("*")
    setExpenses(data || [])
  }

  // Total spent
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  // Group by category
  const byCategory = expenses.reduce((acc, e) => {
    const cat = e.category || "Other"
    acc[cat] = (acc[cat] || 0) + Number(e.amount)
    return acc
  }, {})

  return (
    <div>
      <h1>Analytics</h1>

      {/* KPI */}
      <div style={{ marginBottom: 20 }}>
        <h2>Total spent: €{total.toFixed(2)}</h2>
        <p>Total transactions: {expenses.length}</p>
      </div>

      {/* Category breakdown */}
      <h3>Spending by category</h3>

      <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        {Object.entries(byCategory).map(([cat, value]) => (
          <div
            key={cat}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid #eee",
              borderRadius: 8,
              background: "white",
            }}
          >
            <span>{cat}</span>
            <strong>€{value.toFixed(2)}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}