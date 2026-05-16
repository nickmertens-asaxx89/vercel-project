import "./globals.css"

export const metadata = {
  title: "Expense Tracker SaaS",
  description: "Track your expenses and manage your money",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.body}>
        {children}
      </body>
    </html>
  )
}

const styles = {
  body: {
    margin: 0,
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    background: "#f6f7fb",
    color: "#111",
  },
}