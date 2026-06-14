import fs from "fs/promises";
import os from "os";
import formidable from "formidable";
import { requireAdmin } from "../../../lib/auth";
import { isCloudinaryConfigured, uploadImageFromPath } from "../../../lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set([
  "portfoliooo",
  "portfoliooo/projects",
  "portfoliooo/certifications",
  "portfoliooo/profiles",
]);

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: os.tmpdir(),
      maxFileSize: MAX_BYTES,
      filter: ({ mimetype }) => Boolean(mimetype?.startsWith("image/")),
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const file = files.file?.[0] || files.file;
      if (!file) {
        reject(new Error("No image file provided"));
        return;
      }

      const folderField = fields.folder?.[0] || fields.folder || "portfoliooo";
      const folder = ALLOWED_FOLDERS.has(folderField) ? folderField : "portfoliooo";

      resolve({ file, folder });
    });
  });
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isCloudinaryConfigured()) {
    return res.status(503).json({ error: "Cloudinary is not configured on the server" });
  }

  try {
    const { file, folder } = await parseForm(req);
    const result = await uploadImageFromPath(file.filepath, folder);
    await fs.unlink(file.filepath).catch(() => {});

    return res.status(200).json(result);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    const message = error.message?.includes("maxFileSize")
      ? "Image must be 4 MB or smaller"
      : "Upload failed";
    return res.status(500).json({ error: message });
  }
}
