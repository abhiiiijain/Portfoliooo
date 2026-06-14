export const COUNTRY_DIAL_CODES = [
  { code: "+1", label: "US / CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+91", label: "India (+91)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+86", label: "China (+86)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+880", label: "Bangladesh (+880)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+234", label: "Nigeria (+234)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+52", label: "Mexico (+52)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+46", label: "Sweden (+46)" },
  { code: "+47", label: "Norway (+47)" },
  { code: "+48", label: "Poland (+48)" },
  { code: "+82", label: "South Korea (+82)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+63", label: "Philippines (+63)" },
  { code: "+64", label: "New Zealand (+64)" },
];

export function stripDigits(value) {
  return value?.replace(/\D/g, "") || "";
}

function isValidDigitCount(digits) {
  return digits.length >= 10 && digits.length <= 15;
}

export function formatPhoneNumber(countryCode, localNumber) {
  const codeDigits = stripDigits(countryCode);
  const localDigits = stripDigits(localNumber);
  if (!codeDigits || !localDigits) return "";
  return `+${codeDigits}${localDigits}`;
}

export function isValidPhoneNumber(countryCode, localNumber) {
  const formatted = formatPhoneNumber(countryCode, localNumber);
  if (!formatted) return false;
  return isValidDigitCount(formatted.slice(1));
}

export function isValidFormattedPhone(phone) {
  const trimmed = phone?.trim();
  if (!trimmed?.startsWith("+")) return false;
  return isValidDigitCount(stripDigits(trimmed.slice(1)));
}
