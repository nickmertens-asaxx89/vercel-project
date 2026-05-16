"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [entries, setEntries] = useState([])
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push("/login")
      return
    }

    setUser(data.user)
    fetchEntries(data.user.id)
  }

  async function fetchEntries(userId) {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setEntries(data)
  }

  async function addEntry() {
    if (!title || !value) return

    await supabase.from("entries").insert({
      user_id: user.id,
      title,
      value: Number(value),
    })

    setTitle("")
    setValue("")
    fetchEntries(user.id)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!user) return <p>Loading...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome {user.email}</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Add entry</h2>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addEntry}>Add</button>

      <hr />

      <h2>Your entries</h2>

      {entries.map((e) => (
        <div key={e.id}>
          {e.title} — {e.value}
        </div>
      ))}
    </div>
  )
}