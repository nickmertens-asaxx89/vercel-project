"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Expenses() {
  const [expenses, setExpenses] = useState([])

  // CREATE state
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("General")

  // EDIT state
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editCategory, setEditCategory] = useState("General")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false })

    setExpenses(data || [])
  }

  // CREATE
  async function addExpense() {
    if (!title || !amount) return

    const { data: userData } = await supabase.auth.getUser()

    await supabase.from("expenses").insert({
      title,
      amount: Number(amount),
      category,
      user_id: userData.user.id,
    })

    setTitle("")
    setAmount("")
    setCategory("General")

    load()
  }

  // DELETE
  async function deleteExpense(id) {
    await supabase.from("expenses").delete().eq("id", id)
    load()
  }

  // START EDIT
  function startEdit(expense) {
    setEditingId(expense.id)
    setEditTitle(expense.title)
    setEditAmount(expense.amount)
    setEditCategory(expense.category || "General")
  }

  // UPDATE
  async function updateExpense() {
    await supabase
      .from("expenses")
      .update({
        title: editTitle,
        amount: Number(editAmount),
        category: editCategory,
      })
      .eq("id", editingId)

    setEditingId(null)
    load()
  }

  return (
    <div>
      <h1>Expenses</h1>

      {/* CREATE FORM */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Rent">Rent</option>
        </select>

        <button onClick={addExpense} style={buttonStyle}>
          Add Expense
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: 30 }}>
        {expenses.map((e) => (
          <div key={e.id} style={cardStyle}>

            {/* VIEW MODE */}
            {editingId !== e.id ? (
              <>
                <div>
                  <strong>{e.title}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {e.category || "General"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ fontWeight: "bold" }}>
                    €{e.amount}
                  </div>

                  <button onClick={() => startEdit(e)} style={smallBtn}>
                    Edit
                  </button>

                  <button onClick={() => deleteExpense(e.id)} style={smallBtn}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              /* EDIT MODE */
              <div style={{ width: "100%" }}>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={inputStyle}
                />

                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  style={inputStyle}
                />

                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  style={inputStyle}
                >
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Rent">Rent</option>
                </select>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button onClick={updateExpense} style={buttonStyle}>
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    style={smallBtn}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* STYLES */

const inputStyle = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
}

const buttonStyle = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "none",
  background: "#111827",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
}

const smallBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer",
  fontSize: 12,
}

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: 14,
  background: "white",
  borderRadius: 10,
  border: "1px solid #eee",
  marginBottom: 10,
}