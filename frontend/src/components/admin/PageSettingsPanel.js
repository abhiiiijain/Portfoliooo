import { useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminSaveBar from "@/components/admin/AdminSaveBar";
import FooterQuickLinksEditor from "@/components/admin/FooterQuickLinksEditor";
import {
  AdminFieldGroup,
  AdminPanel,
  AdminPanelBody,
  AdminStickyFooter,
  btnSecondary,
  formGridClass,
  hintClass,
  inputClass,
  labelClass,
} from "@/components/admin/adminUi";
import {
  generalFieldGroups,
  getGeneralField,
  getNestedValue,
  pageFieldGroups,
  paragraphsToText,
  setNestedValue,
  textToParagraphs,
} from "@/components/admin/siteSettingsConfig";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  getDefaultFooterQuickLinks,
  getFooterQuickLinks,
  normalizeFooterQuickLinks,
} from "@portfoliooo/shared/site";

function FieldInput({ path, label, type = "text", folder, placeholder, hint, defaultTrue, draft, onChange }) {
  const spanFull = type === "textarea" || type === "image" || type === "checkbox";

  if (type === "image") {
    return (
      <div className={spanFull ? "col-span-2 lg:col-span-1" : ""}>
        <ImageUploadField
          label={label}
          value={getNestedValue(draft, path) || ""}
          folder={folder || "portfoliooo/profiles"}
          onChange={(url) => onChange(path, url)}
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className={`${spanFull ? "col-span-2 lg:col-span-1" : ""} flex items-start`}>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 w-full">
          <input
            type="checkbox"
            checked={defaultTrue ? getNestedValue(draft, path) !== false : getNestedValue(draft, path) === true}
            onChange={(e) => onChange(path, e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-800 text-violet-600 focus:ring-violet-500"
          />
          <span>
            <span className={labelClass}>{label}</span>
            {hint && <p className={hintClass}>{hint}</p>}
          </span>
        </label>
      </div>
    );
  }

  return (
    <label className={`block ${spanFull ? "col-span-2 lg:col-span-1" : ""}`}>
      <span className={labelClass}>{label}</span>
      {hint && <p className={hintClass}>{hint}</p>}
      {type === "textarea" ? (
        <textarea
          value={getNestedValue(draft, path) || ""}
          onChange={(e) => onChange(path, e.target.value)}
          rows={4}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          value={getNestedValue(draft, path) || ""}
          onChange={(e) => onChange(path, e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </label>
  );
}

export default function PageSettingsPanel({ sectionId }) {
  const { site, loading, saveSite } = useSiteSettings();
  const [draft, setDraft] = useState(null);
  const [biographyText, setBiographyText] = useState("");
  const [quickLinks, setQuickLinks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!site) return;
    setDraft(JSON.parse(JSON.stringify(site)));
    if (sectionId === "about") {
      setBiographyText(paragraphsToText(site.pages?.about?.biography));
    }
    if (sectionId === "footer") {
      const links = Array.isArray(site.footer?.quickLinks)
        ? normalizeFooterQuickLinks(site.footer.quickLinks)
        : getFooterQuickLinks(site.footer, site.nav, site.social);
      setQuickLinks(links.map((link) => ({ ...link })));
    }
  }, [site, sectionId]);

  if (loading || !draft) {
    return (
      <AdminPanel>
        <AdminPanelBody>
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-32 rounded bg-slate-800" />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="h-10 rounded-lg bg-slate-800" />
              <div className="h-10 rounded-lg bg-slate-800" />
            </div>
          </div>
        </AdminPanelBody>
      </AdminPanel>
    );
  }

  const pageFields =
    sectionId === "contact"
      ? pageFieldGroups.contact
      : sectionId === "footer"
        ? pageFieldGroups.footer
        : pageFieldGroups[sectionId] || [];

  const updateDraft = (path, value) => {
    setDraft((prev) => setNestedValue(prev, path, value));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let payload = draft;
      if (sectionId === "about") {
        payload = setNestedValue(draft, "pages.about.biography", textToParagraphs(biographyText));
      }
      if (sectionId === "footer") {
        payload = {
          ...site,
          footer: {
            ...draft.footer,
            quickLinks: normalizeFooterQuickLinks(quickLinks),
          },
        };
      }
      if (sectionId === "general") {
        payload = { ...site, ...draft };
      }
      await saveSite(payload);
      setSaved(true);
    } catch (error) {
      alert(error.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const saveLabel =
    sectionId === "footer"
      ? "Save footer"
      : sectionId === "general"
        ? "Save settings"
        : "Save changes";

  return (
    <AdminPanel>
      <AdminPanelBody>
        {sectionId === "general" ? (
          generalFieldGroups.map((group) => (
            <AdminFieldGroup key={group.title} title={group.title} description={group.description}>
              <div className={formGridClass}>
                {group.fields.map((key) => {
                  const field = getGeneralField(key);
                  if (!field) return null;
                  return (
                    <FieldInput
                      key={key}
                      path={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      hint={field.hint}
                      draft={draft}
                      onChange={updateDraft}
                    />
                  );
                })}
              </div>
            </AdminFieldGroup>
          ))
        ) : (
          <div className={formGridClass}>
            {pageFields.map(({ path, label, type = "text", folder, placeholder, hint, defaultTrue }) => (
              <FieldInput
                key={path}
                path={path}
                label={label}
                type={type}
                folder={folder}
                placeholder={placeholder}
                hint={hint}
                defaultTrue={defaultTrue}
                draft={draft}
                onChange={updateDraft}
              />
            ))}
          </div>
        )}

        {sectionId === "footer" && (
          <AdminFieldGroup
            title="Quick links"
            description="Links shown in the footer Quick Links column. Save to apply your custom list.">
            <div className="mb-4 flex flex-wrap gap-3">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setQuickLinks(getDefaultFooterQuickLinks(site.nav, site.social, site.footer));
                  setSaved(false);
                }}>
                Sync from navigation
              </button>
            </div>
            <FooterQuickLinksEditor
              items={quickLinks}
              onChange={(next) => {
                setQuickLinks(next);
                setSaved(false);
              }}
            />
          </AdminFieldGroup>
        )}

        {sectionId === "about" && (
          <AdminFieldGroup title="Biography" description="Separate paragraphs with a blank line.">
            <textarea
              value={biographyText}
              onChange={(e) => {
                setBiographyText(e.target.value);
                setSaved(false);
              }}
              rows={10}
              className={`${inputClass} font-normal leading-relaxed`}
            />
          </AdminFieldGroup>
        )}

        <AdminStickyFooter>
          <AdminSaveBar saving={saving} saved={saved} onSave={handleSave} label={saveLabel} />
        </AdminStickyFooter>
      </AdminPanelBody>
    </AdminPanel>
  );
}
