import { useEffect, useState } from "react";

export default function ClientDate({
  value,
  format = "date",
  className = "",
  fallback = "—",
}) {
  const [formatted, setFormatted] = useState(fallback);

  useEffect(() => {
    if (!value) return;
    const date = new Date(value);
    setFormatted(
      format === "datetime" ? date.toLocaleString() : date.toLocaleDateString()
    );
  }, [value, format]);

  return (
    <span className={className} suppressHydrationWarning>
      {formatted}
    </span>
  );
}
