"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("General")

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push("/login")
      return
    }

    setUser(data.user)
    loadExpenses(data.user.id)
  }

  async function loadExpenses(userId) {
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false })

    setExpenses(data || [])
  }

  async function addExpense() {
    if (!title || !amount) return

    await supabase.from("expenses").insert({
      user_id: user.id,
      title,
      amount: Number(amount),
      category,
    })

    setTitle("")
    setAmount("")
    loadExpenses(user.id)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  )

  if (!user) return <p>Loading...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>
      <p>Logged in as {user.email}</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Total spent: €{total.toFixed(2)}</h2>

      <h3>Add expense</h3>

      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Rent</option>
      </select>

      <button onClick={addExpense}>Add</button>

      <hr />

      <h3>Expenses</h3>

      {expenses.map((e) => (
        <div key={e.id}>
          {e.title} — €{e.amount} ({e.category})
        </div>
      ))}
    </div>
  )
}