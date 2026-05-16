"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
]

export default function AnalyticsPage() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    loadExpenses()
  }, [])

  async function loadExpenses() {
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: true })

    setExpenses(data || [])
  }

  // CATEGORY BREAKDOWN
  const categoryMap = {}

  expenses.forEach((expense) => {
    const category = expense.category || "General"

    if (!categoryMap[category]) {
      categoryMap[category] = 0
    }

    categoryMap[category] += Number(expense.amount)
  })

  const pieData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  )

  // TREND DATA
  const lineData = expenses.map((expense) => ({
    date: new Date(
      expense.created_at
    ).toLocaleDateString(),

    amount: Number(expense.amount),
  }))

  return (
    <div style={pageStyle}>

      <h1 style={titleStyle}>
        Analytics
      </h1>

      <div style={gridStyle}>

        {/* PIE CHART */}
        <div style={cardStyle}>

          <h3 style={chartTitle}>
            Spending by Category
          </h3>

          <div style={chartWrapperStyle}>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* LINE CHART */}
        <div style={cardStyle}>

          <h3 style={chartTitle}>
            Expense Trend
          </h3>

          <div style={chartWrapperStyle}>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>
    </div>
  )
}

/* STYLES */

const pageStyle = {
  width: "100%",
  minWidth: 0,
}

const titleStyle = {
  marginBottom: 20,
}

const gridStyle = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",

  gap: 20,

  width: "100%",
  minWidth: 0,
}

const cardStyle = {
  background: "white",
  borderRadius: 12,
  padding: 20,
  border: "1px solid #eee",

  minWidth: 0,
}

const chartTitle = {
  marginTop: 0,
  marginBottom: 20,
}

const chartWrapperStyle = {
  width: "100%",
  height: 300,

  // VERY IMPORTANT FIX
  minWidth: 0,
}