import ImageUploadField from "@/components/admin/ImageUploadField";
import { formGridClass, hintClass, inputClass, labelClass } from "@/components/admin/adminUi";

export default function AdminFormFields({ fields, form, setForm }) {
  return (
    <div className={formGridClass}>
      {fields.map(({ key, label, type = "text", folder, placeholder, hint }) => {
        const spanFull = type === "textarea" || type === "image";

        if (type === "image") {
          return (
            <div key={key} className={spanFull ? "col-span-2 lg:col-span-1" : ""}>
              <ImageUploadField
                label={label}
                value={form[key] || ""}
                folder={folder || "portfoliooo"}
                onChange={(url) => setForm({ ...form, [key]: url })}
              />
            </div>
          );
        }

        return (
          <label key={key} className={`block ${spanFull ? "col-span-2 lg:col-span-1" : ""}`}>
            <span className={labelClass}>{label}</span>
            {hint && <p className={hintClass}>{hint}</p>}
            {type === "textarea" ? (
              <textarea
                value={form[key] || ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                rows={3}
                placeholder={placeholder}
                className={inputClass}
              />
            ) : type === "checkbox" ? (
              <input
                type="checkbox"
                checked={Boolean(form[key])}
                onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                className="mt-2 ml-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-violet-600 focus:ring-violet-500"
              />
            ) : (
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className={inputClass}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
