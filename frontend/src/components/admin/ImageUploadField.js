import { useRef, useState } from "react";
import { inputClass } from "@/components/admin/adminUi";
import { adminUploadImage } from "@/lib/adminApi";

export default function ImageUploadField({
  label,
  value = "",
  onChange,
  folder = "portfoliooo",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const { url } = await adminUploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="block sm:col-span-2">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="mt-2 space-y-3">
        {value ? (
          <div className="flex items-start gap-4">
            <img
              src={value}
              alt=""
              className="w-24 h-24 rounded-lg object-cover border border-white/10 bg-slate-800"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 break-all">{value}</p>
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs text-red-400 mt-2 hover:underline">
                Remove image
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">No image uploaded yet</p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="text-sm text-slate-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white file:cursor-pointer hover:file:bg-violet-500"
          />
          {uploading && <span className="text-sm text-violet-300">Uploading…</span>}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste a Cloudinary URL"
          className={inputClass}
        />
      </div>
    </div>
  );
}
