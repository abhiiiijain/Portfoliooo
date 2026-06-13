export const inputClass =
  "mt-1.5 w-full px-3.5 py-2.5 rounded-lg bg-slate-950/60 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 transition";

export const labelClass = "text-sm font-medium text-slate-200";
export const hintClass = "text-xs text-slate-500 mt-0.5 leading-relaxed";

export const formGridClass = "grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1";

export const btnPrimary =
  "inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none text-sm font-semibold text-white shadow-sm shadow-violet-900/30 transition";

export const btnSecondary =
  "inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-sm font-medium text-slate-200 transition";

export const btnDanger =
  "inline-flex items-center justify-center px-3 py-2 rounded-lg border border-red-500/20 text-sm text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition disabled:opacity-30 disabled:pointer-events-none";

export const panelClass =
  "rounded-2xl border border-white/10 bg-slate-900/50 shadow-sm shadow-black/20 overflow-hidden";

export function AdminPanel({ children, className = "" }) {
  return <section className={`${panelClass} ${className}`}>{children}</section>;
}

export function AdminPanelBody({ children, className = "" }) {
  return <div className={`p-6 space-y-6 ${className}`}>{children}</div>;
}

export function AdminFieldGroup({ title, description, children, className = "" }) {
  return (
    <div className={`space-y-4 pb-6 border-b border-white/5 last:border-0 last:pb-0 ${className}`}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-sm font-semibold text-slate-200">{title}</h3>}
          {description && <p className={`${hintClass} ${title ? "mt-0.5" : ""}`}>{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export function AdminStickyFooter({ children, className = "" }) {
  return (
    <div
      className={`sticky bottom-0 -mx-6 -mb-6 px-6 py-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 ${className}`}>
      {children}
    </div>
  );
}
