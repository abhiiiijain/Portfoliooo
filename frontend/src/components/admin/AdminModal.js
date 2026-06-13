import { useEffect } from "react";
import { btnPrimary, btnSecondary } from "@/components/admin/adminUi";

export default function AdminModal({
  open,
  onClose,
  title,
  onSubmit,
  submitting = false,
  submitLabel = "Save",
  panelClassName = "max-w-lg",
  children,
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className={`relative w-full ${panelClassName} max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
          <h3 id="admin-modal-title" className="text-base font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-white text-2xl leading-none px-1">
            ×
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.();
          }}
          className="flex flex-col min-h-0 flex-1">
          <div className="p-5 space-y-3 overflow-y-auto">{children}</div>
          <div className="flex gap-3 px-5 py-4 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 text-sm font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 ${btnPrimary}`}>
              {submitting ? "Saving…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
