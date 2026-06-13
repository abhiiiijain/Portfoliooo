import { btnDanger, inputClass } from "@/components/admin/adminUi";

export default function NavEditor({ items = [], onChange }) {
  const updateItem = (index, field, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { href: "", title: "" }]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-white/10 divide-y divide-white/5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_5.5rem] gap-4 px-4 py-2.5 bg-white/[0.02] text-xs font-medium uppercase tracking-wide text-slate-500 lg:hidden">
          <span>Title</span>
          <span>Path</span>
          <span className="sr-only">Actions</span>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_5.5rem] gap-4 px-4 py-3 items-center lg:grid-cols-1 lg:gap-3">
            <label className="block min-w-0">
              <span className="mb-1 hidden text-xs text-slate-500 lg:block">Title</span>
              <input
                value={item.title || ""}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                placeholder="About"
                className={inputClass}
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-1 hidden text-xs text-slate-500 lg:block">Path</span>
              <input
                value={item.href || ""}
                onChange={(e) => updateItem(index, "href", e.target.value)}
                placeholder="/about"
                className={inputClass}
              />
            </label>
            <button
              type="button"
              onClick={() => removeItem(index)}
              disabled={items.length <= 1}
              aria-label={`Remove ${item.title || "link"}`}
              className={`${btnDanger} h-[42px] lg:w-full`}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Use site paths like <code className="text-slate-400">/about</code> or{" "}
        <code className="text-slate-400">/contact</code>.
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
