import { btnDanger, inputClass } from "@/components/admin/adminUi";

export default function FooterQuickLinksEditor({ items = [], onChange }) {
  const updateItem = (index, field, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { label: "", href: "", external: false }]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-white/10 divide-y divide-white/5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_5rem_5.5rem] gap-4 px-4 py-2.5 bg-white/[0.02] text-xs font-medium uppercase tracking-wide text-slate-500 lg:hidden">
          <span>Label</span>
          <span>URL</span>
          <span>External</span>
          <span className="sr-only">Actions</span>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_5rem_5.5rem] gap-4 px-4 py-3 items-center lg:grid-cols-1 lg:gap-3">
            <label className="block min-w-0">
              <span className="mb-1 hidden text-xs text-slate-500 lg:block">Label</span>
              <input
                value={item.label || ""}
                onChange={(e) => updateItem(index, "label", e.target.value)}
                placeholder="About"
                className={inputClass}
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-1 hidden text-xs text-slate-500 lg:block">URL</span>
              <input
                value={item.href || ""}
                onChange={(e) => updateItem(index, "href", e.target.value)}
                placeholder="/about or https://..."
                className={inputClass}
              />
            </label>
            <label className="flex h-[42px] items-center justify-center gap-2 text-sm text-slate-300 lg:justify-start">
              <input
                type="checkbox"
                checked={Boolean(item.external)}
                onChange={(e) => updateItem(index, "external", e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-violet-600 focus:ring-violet-500"
              />
              <span className="lg:hidden text-xs text-slate-500">External</span>
            </label>
            <button
              type="button"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item.label || "link"}`}
              className={`${btnDanger} h-[42px] lg:w-full`}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Use site paths like <code className="text-slate-400">/about</code> or full URLs for external links
        (check External for links that open in a new tab).
      </p>

      <button
        type="button"
        onClick={addItem}
        className="rounded-lg border border-violet-500/30 px-4 py-2 text-sm font-medium text-violet-300 transition hover:border-violet-500/50 hover:bg-violet-500/10">
        + Add link
      </button>
    </div>
  );
}
