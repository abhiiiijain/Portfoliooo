export const DEFAULT_BODY_FONT = "outfit";
export const DEFAULT_HEADING_FONT = "orbitron";

export const BODY_FONTS = [
  { id: "outfit", label: "Outfit", family: "Outfit" },
  { id: "inter", label: "Inter", family: "Inter" },
  { id: "montserrat", label: "Montserrat", family: "Montserrat" },
  { id: "poppins", label: "Poppins", family: "Poppins" },
  { id: "roboto", label: "Roboto", family: "Roboto" },
  { id: "open-sans", label: "Open Sans", family: "Open Sans" },
  { id: "lato", label: "Lato", family: "Lato" },
];

export const HEADING_FONTS = [
  { id: "orbitron", label: "Orbitron", family: "Orbitron" },
  { id: "rajdhani", label: "Rajdhani", family: "Rajdhani" },
  { id: "exo-2", label: "Exo 2", family: "Exo 2" },
  { id: "audiowide", label: "Audiowide", family: "Audiowide" },
  { id: "michroma", label: "Michroma", family: "Michroma" },
  { id: "teko", label: "Teko", family: "Teko" },
  { id: "frank-ruhl-libre", label: "Frank Ruhl Libre", family: "Frank Ruhl Libre" },
  { id: "abril-fatface", label: "Abril Fatface", family: "Abril Fatface" },
];

export function resolveBodyFont(id) {
  return BODY_FONTS.find((font) => font.id === id) || BODY_FONTS[0];
}

export function resolveHeadingFont(id) {
  return HEADING_FONTS.find((font) => font.id === id) || HEADING_FONTS[0];
}

export function normalizeFonts(fonts) {
  return {
    body: resolveBodyFont(fonts?.body).id,
    heading: resolveHeadingFont(fonts?.heading).id,
  };
}

export function buildGoogleFontsHref(families) {
  const unique = [...new Set(families.filter(Boolean))];
  const query = unique
    .map((family) => {
      const name = family.replace(/ /g, "+");
      return `family=${name}:wght@400;500;600;700`;
    })
    .join("&");

  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}
