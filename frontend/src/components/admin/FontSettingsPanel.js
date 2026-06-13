import { useEffect, useState } from "react";
import Head from "next/head";
import AdminSaveBar from "@/components/admin/AdminSaveBar";
import {
  AdminFieldGroup,
  AdminPanel,
  AdminPanelBody,
  AdminStickyFooter,
  formGridClass,
  inputClass,
  labelClass,
} from "@/components/admin/adminUi";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  BODY_FONTS,
  DEFAULT_BODY_FONT,
  DEFAULT_HEADING_FONT,
  HEADING_FONTS,
  buildGoogleFontsHref,
  normalizeFonts,
  resolveBodyFont,
  resolveHeadingFont,
} from "@/lib/fonts";

function FontSelect({ label, description, value, options, onChange }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <p className="text-sm text-slate-500 mt-0.5 mb-3">{description}</p>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} cursor-pointer`}>
        {options.map((font) => (
          <option key={font.id} value={font.id}>
            {font.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FontSettingsPanel() {
  const { site, loading, saveSite } = useSiteSettings();
  const [bodyFont, setBodyFont] = useState(DEFAULT_BODY_FONT);
  const [headingFont, setHeadingFont] = useState(DEFAULT_HEADING_FONT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!site) return;
    const fonts = normalizeFonts(site.fonts);
    setBodyFont(fonts.body);
    setHeadingFont(fonts.heading);
  }, [site]);

  const handleSave = async () => {
    if (!site) return;

    setSaving(true);
    try {
      await saveSite({
        ...site,
        fonts: { body: bodyFont, heading: headingFont },
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !site) {
    return (
      <AdminPanel>
        <AdminPanelBody>
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              <div className="h-20 rounded-xl bg-slate-800" />
              <div className="h-20 rounded-xl bg-slate-800" />
            </div>
          </div>
        </AdminPanelBody>
      </AdminPanel>
    );
  }

  const bodyPreview = resolveBodyFont(bodyFont);
  const headingPreview = resolveHeadingFont(headingFont);
  const previewFontsHref = buildGoogleFontsHref([bodyPreview.family, headingPreview.family]);

  return (
    <AdminPanel>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link key={previewFontsHref} href={previewFontsHref} rel="stylesheet" />
      </Head>

      <AdminPanelBody>
        <div className={formGridClass}>
          <FontSelect
            label="Body font"
            description="Paragraphs and UI text on public pages."
            value={bodyFont}
            options={BODY_FONTS}
            onChange={(value) => {
              setBodyFont(value);
              setSaved(false);
            }}
          />
          <FontSelect
            label="Heading font"
            description="Titles, section headings, and card headings."
            value={headingFont}
            options={HEADING_FONTS}
            onChange={(value) => {
              setHeadingFont(value);
              setSaved(false);
            }}
          />
        </div>

        <AdminFieldGroup title="Preview">
          <div
            className="rounded-xl border border-white/10 bg-slate-950/40 p-6 space-y-3"
            style={{ fontFamily: `'${bodyPreview.family}', sans-serif` }}>
            <h3
              className="text-2xl font-bold text-slate-100"
              style={{ fontFamily: `'${headingPreview.family}', sans-serif` }}>
              Technical Skills
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              The quick brown fox jumps over the lazy dog. This preview shows how your heading and body
              fonts look together on the live site.
            </p>
          </div>
        </AdminFieldGroup>

        <AdminStickyFooter>
          <AdminSaveBar saving={saving} saved={saved} onSave={handleSave} label="Save typography" />
        </AdminStickyFooter>
      </AdminPanelBody>
    </AdminPanel>
  );
}
