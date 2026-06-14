import { stripDigits } from "./phone";

export function parseWhatsAppNumber(value) {
  if (!value?.trim()) return "";
  return stripDigits(value);
}

export function toWhatsAppUrl(value) {
  const digits = parseWhatsAppNumber(value);
  return digits ? `https://wa.me/${digits}` : "";
}
