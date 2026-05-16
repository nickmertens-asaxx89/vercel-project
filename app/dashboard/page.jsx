"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Card from "@/components/Card"

export default function Overview() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase.from("expenses").select("*")
    setExpenses(data || [])
  }

  const total = expenses.reduce((a, b) => a + Number(b.amount), 0)

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Overview</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20
      }}>
        <Card title="Total spent" value={`€${total.toFixed(2)}`} />
        <Card title="Transactions" value={expenses.length} />
        <Card title="Avg expense" value={`€${(total / (expenses.length || 1)).toFixed(2)}`} />
      </div>
    </div>
  )
}