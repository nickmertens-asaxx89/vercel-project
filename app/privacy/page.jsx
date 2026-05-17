export default function PrivacyPolicyPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>Privacy Policy</h1>

        <div style={styles.meta}>
          <p><strong>Effective date:</strong> 17 May 2026</p>
          <p><strong>Controller:</strong> Expense Tracker</p>
          <p>
            <strong>Contact:</strong>{" "}
            <a href="mailto:asaxx89@icloud.com">asaxx89@icloud.com</a>
          </p>
        </div>

        <p>
          This Privacy Policy explains how <strong>Expense Tracker</strong> (“we”, “us”, “our”)
          processes your personal data in accordance with the General Data Protection Regulation
          (EU) 2016/679 (“GDPR”).
        </p>

        <p>By using the App, you acknowledge this Privacy Policy.</p>

        <Section title="1. Data Controller">
          We are the data controller responsible for your personal data collected through the App.
        </Section>

        <Section title="2. Personal Data We Collect">
          <h3>2.1 Email Address</h3>
          <p>We collect your email address when you register or log in.</p>
          <ul>
            <li>Account creation and authentication</li>
            <li>Password resets and security notifications</li>
            <li>Essential service communication</li>
          </ul>

          <h3>2.2 Expense and Financial Data</h3>
          <p>We store data you voluntarily enter into the App, such as:</p>
          <ul>
            <li>Income and expenses</li>
            <li>Categories, notes, and descriptions</li>
            <li>Amounts and dates</li>
          </ul>

          <h3>2.3 Technical and Usage Data</h3>
          <p>
            We may collect limited technical data such as device type, operating system, and
            usage logs to improve the App.
          </p>
        </Section>

        <Section title="3. Legal Basis for Processing">
          <ul>
            <li><strong>Contract (Art. 6(1)(b))</strong> – to provide the App functionality</li>
            <li><strong>Consent (Art. 6(1)(a))</strong> – for optional features</li>
            <li><strong>Legitimate interests (Art. 6(1)(f))</strong> – security and improvement</li>
            <li><strong>Legal obligation (Art. 6(1)(c))</strong> – compliance with law</li>
          </ul>
        </Section>

        <Section title="4. How We Use Your Data">
          <ul>
            <li>Provide and operate the App</li>
            <li>Authenticate users and secure accounts</li>
            <li>Store and display financial records</li>
            <li>Improve functionality and performance</li>
            <li>Prevent fraud and misuse</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing">
          <p>We do not sell your data.</p>
          <ul>
            <li>Service providers under GDPR-compliant agreements</li>
            <li>Legal authorities when required by law</li>
            <li>Security and fraud prevention services</li>
          </ul>
        </Section>

        <Section title="6. International Transfers">
          <p>
            If data is transferred outside the EEA, we use safeguards such as Standard Contractual
            Clauses (SCCs).
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain data only as long as necessary to provide the service or comply with legal
            obligations.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <ul>
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion (“right to be forgotten”)</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
        </Section>

        <Section title="9. Account Deletion">
          <p>
            You may request deletion of your account and data at any time. We will remove your data
            unless legally required to retain it.
          </p>
        </Section>

        <Section title="10. Security">
          <p>
            We use appropriate technical and organizational measures such as encryption, secure
            authentication, and access controls.
          </p>
        </Section>

        <Section title="11. Children’s Data">
          <p>
            The App is not intended for users under 16 (or local digital consent age).
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be published in the
            App or website.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            Email: <a href="mailto:asaxx89@icloud.com">asaxx89@icloud.com</a>
            <br />
            Controller: Expense Tracker
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

const styles = {
  page: {
    background: "#f9f9f9",
    minHeight: "100vh",
    padding: "40px 16px",
    fontFamily: "Arial, sans-serif",
    color: "#222",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  meta: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  section: {
    marginTop: "20px",
  },
};
