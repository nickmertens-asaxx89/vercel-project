export default function Card({ title, value }) {
    return (
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        border: "1px solid #eee",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
      }}>
        <p style={{ margin: 0, color: "#666" }}>{title}</p>
        <h2 style={{ margin: "8px 0 0" }}>{value}</h2>
      </div>
    )
  }