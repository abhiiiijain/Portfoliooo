import Head from "next/head";
import { getUptimeSnapshot } from "../lib/uptime";

export default function KeepAlivePage({ snapshot }) {
  return (
    <>
      <Head>
        <title>Backend keepalive</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: "32rem",
          margin: "4rem auto",
          padding: "0 1.5rem",
          color: "#0f172a",
          lineHeight: 1.6,
        }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Backend status</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>{snapshot.service}</p>

        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "0.75rem 1.25rem",
            margin: 0,
          }}>
          <dt style={{ color: "#64748b" }}>Status</dt>
          <dd style={{ margin: 0, fontWeight: 600, color: snapshot.ok ? "#059669" : "#dc2626" }}>
            {snapshot.ok ? "Live" : "Down"}
          </dd>

          <dt style={{ color: "#64748b" }}>Uptime</dt>
          <dd style={{ margin: 0, fontWeight: 600 }}>{snapshot.uptime}</dd>

          <dt style={{ color: "#64748b" }}>Live since</dt>
          <dd style={{ margin: 0 }}>{snapshot.liveSinceLabel}</dd>

          <dt style={{ color: "#64748b" }}>Checked at</dt>
          <dd style={{ margin: 0 }}>{snapshot.checkedAtLabel}</dd>
        </dl>

        <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "#64748b" }}>
          JSON:{" "}
          <a href="/api/keepalive" style={{ color: "#7c3aed" }}>
            /api/keepalive
          </a>
        </p>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      snapshot: getUptimeSnapshot(),
    },
  };
}
