export function parseWhatsAppNumber(value) {
  if (!value?.trim()) return "";
  return value.replace(/\D/g, "");
}

export function toWhatsAppUrl(value) {
  const digits = parseWhatsAppNumber(value);
  return digits ? `https://wa.me/${digits}` : "";
}
