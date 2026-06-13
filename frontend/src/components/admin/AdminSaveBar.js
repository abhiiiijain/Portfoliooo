import { btnPrimary } from "@/components/admin/adminUi";

export default function AdminSaveBar({
  saving,
  saved,
  onSave,
  label = "Save",
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button type="button" onClick={onSave} disabled={saving} className={btnPrimary}>
        {saving ? "Saving…" : label}
      </button>
      {saved && (
        <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Saved
        </span>
      )}
    </div>
  );
}
