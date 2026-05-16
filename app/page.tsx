import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to My App</h1>
        <p style={styles.subtitle}>
          A simple, fast, and modern platform to map your expenses.
        </p>

        <div style={styles.actions}>
          <Link href="/login" style={styles.buttonPrimary}>
            Go to Login
          </Link>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "Arial, sans-serif",
    background: "#f7f7f7",
    color: "#222",
  },
  hero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    maxWidth: "500px",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  buttonPrimary: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 600,
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.875rem",
    color: "#666",
  },
};