const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

export function languageColor(name, apiColor) {
  if (apiColor) return apiColor;
  return LANGUAGE_COLORS[name] || "#8b949e";
}

export function formatStatPlus(value) {
  const num = Number(value) || 0;
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}M+`;
  }
  if (num >= 10_000) {
    const formatted = (num / 1_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}K+`;
  }
  if (num >= 100) {
    return `${Math.floor(num / 100) * 100}+`;
  }
  return `${num}+`;
}
