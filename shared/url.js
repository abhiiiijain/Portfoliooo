export function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}
