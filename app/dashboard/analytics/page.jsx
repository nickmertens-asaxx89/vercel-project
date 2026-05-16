"use client"

import { useEffect, useMemo, useState } from "react"
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

  // CURRENT MONTH
  const currentMonth = new Date().getMonth()

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth)

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

  // FILTERED EXPENSES
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.created_at)

      return date.getMonth() === selectedMonth
    })
  }, [expenses, selectedMonth])

  // CATEGORY BREAKDOWN
  const categoryMap = {}

  filteredExpenses.forEach((expense) => {
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

  // LINE DATA
  const lineData = filteredExpenses.map((expense) => ({
    date: new Date(
      expense.created_at
    ).toLocaleDateString(),

    amount: Number(expense.amount),
  }))

  // KPI CALCULATIONS
  const totalSpent = filteredExpenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  )

  const avgExpense =
    filteredExpenses.length > 0
      ? totalSpent / filteredExpenses.length
      : 0

  return (
    <div style={pageStyle}>

      {/* HEADER */}
      <div style={headerStyle}>

        <h1 style={{ margin: 0 }}>
          Analytics
        </h1>

        {/* MONTH SELECT */}
        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(Number(e.target.value))
          }
          style={selectStyle}
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

      </div>

      {/* KPI CARDS */}
      <div style={kpiGridStyle}>

        <KpiCard
          title="Total Spent"
          value={`€${totalSpent.toFixed(2)}`}
        />

        <KpiCard
          title="Transactions"
          value={filteredExpenses.length}
        />

        <KpiCard
          title="Average Expense"
          value={`€${avgExpense.toFixed(2)}`}
        />

      </div>

      {/* CHART GRID */}
      <div style={gridStyle}>

        {/* PIE */}
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

        {/* LINE */}
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

/* KPI CARD */

function KpiCard({ title, value }) {
  return (
    <div style={kpiCardStyle}>
      <p style={kpiTitleStyle}>
        {title}
      </p>

      <h2 style={kpiValueStyle}>
        {value}
      </h2>
    </div>
  )
}

/* MONTHS */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/* STYLES */

const pageStyle = {
  width: "100%",
  minWidth: 0,
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  flexWrap: "wrap",
  marginBottom: 20,
}

const selectStyle = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
}

const kpiGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 20,
}

const kpiCardStyle = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  border: "1px solid #eee",
}

const kpiTitleStyle = {
  margin: 0,
  color: "#666",
}

const kpiValueStyle = {
  marginBottom: 0,
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
  minWidth: 0,
}
