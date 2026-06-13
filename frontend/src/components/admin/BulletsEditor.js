import { useState } from "react";
import { btnSecondary, inputClass, labelClass } from "@/components/admin/adminUi";

export default function BulletsEditor({ value = [], onChange }) {
  const [draft, setDraft] = useState("");

  const addBullet = () => {
    const text = draft.trim();
    if (!text) return;
    onChange([...value, text]);
    setDraft("");
  };

  return (
    <div>
      <span className={labelClass}>Bullets</span>
      <div className="mt-1.5 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addBullet();
            }
          }}
          placeholder="Add a bullet point"
          className={`flex-1 ${inputClass}`}
        />
        <button type="button" onClick={addBullet} className={`${btnSecondary} shrink-0`}>
          Add
        </button>
      </div>
      {value.length > 0 && (
        <ul className="mt-2 space-y-1">
          {value.map((bullet, index) => (
            <li
              key={`${bullet}-${index}`}
              className="flex items-center justify-between rounded bg-slate-800/50 px-2 py-1 text-sm text-slate-300">
              <span>{bullet}</span>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="ml-2 text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
