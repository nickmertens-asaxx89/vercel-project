"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Card from "@/components/Card"

export default function Overview() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    loadExpenses()
  }, [])

  async function loadExpenses() {
    const { data } = await supabase
      .from("expenses")
      .select("*")

    setExpenses(data || [])
  }

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  )

  const average =
    expenses.length > 0
      ? total / expenses.length
      : 0

  return (
    <div>
      <h1 style={titleStyle}>Overview</h1>

      {/* RESPONSIVE GRID */}
      <div style={gridStyle}>
        <Card
          title="Total Spent"
          value={`€${total.toFixed(2)}`}
        />

        <Card
          title="Transactions"
          value={expenses.length}
        />

        <Card
          title="Average Expense"
          value={`€${average.toFixed(2)}`}
        />
      </div>
    </div>
  )
}

/* STYLES */

const titleStyle = {
  marginBottom: 20,
}

const gridStyle = {
  display: "grid",

  // MAGIC RESPONSIVE LINE
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",

  gap: 20,
}
