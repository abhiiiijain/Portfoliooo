function formatUtcLabel(iso) {
  return iso.replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

function formatUptime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (secs || !parts.length) parts.push(`${secs}s`);

  return parts.join(" ");
}

export function getUptimeSnapshot() {
  const uptimeSeconds = Math.floor(process.uptime());
  const liveSince = new Date(Date.now() - uptimeSeconds * 1000).toISOString();
  const uptime = formatUptime(uptimeSeconds);
  const checkedAt = new Date().toISOString();

  return {
    ok: true,
    service: "portfoliooo-api",
    liveSince,
    liveSinceLabel: formatUtcLabel(liveSince),
    uptimeSeconds,
    uptime,
    message: `Backend has been live for ${uptime}`,
    checkedAt,
    checkedAtLabel: formatUtcLabel(checkedAt),
  };
}
