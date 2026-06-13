import dbConnect from "../../../lib/mongodb";
import SiteSettings from "../../../models/SiteSettings";
import { requireAdmin } from "../../../lib/auth";
import { normalizeSocial, parseGitHubUsername, parseLinkedInUsername } from "@portfoliooo/shared/social";
import { parseWhatsAppNumber, toWhatsAppUrl } from "@portfoliooo/shared/whatsapp";
import { normalizeFooter, normalizeNav } from "@portfoliooo/shared/site";

function stripSiteMeta(doc) {
  const { _id, __v, key, createdAt, updatedAt, ...data } = doc;
  return data;
}

function normalizeSiteForAdmin(data) {
  return {
    ...data,
    whatsapp: parseWhatsAppNumber(data.whatsapp),
    social: data.social
      ? {
          ...data.social,
          github: parseGitHubUsername(data.social.github),
          linkedin: parseLinkedInUsername(data.social.linkedin),
        }
      : data.social,
    footer: normalizeFooter(data.footer),
    nav: normalizeNav(data.nav),
  };
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    await dbConnect();

    if (req.method === "GET") {
      const site = await SiteSettings.findOne({ key: "site" }).lean();
      if (!site) return res.status(404).json({ error: "Site settings not found" });
      return res.status(200).json(normalizeSiteForAdmin(stripSiteMeta(site)));
    }

    if (req.method === "PUT") {
      const { createdAt, updatedAt, __v, _id, ...body } = req.body;
      const payload = { ...body, key: "site" };

      if (payload.whatsapp !== undefined) {
        payload.whatsapp = toWhatsAppUrl(payload.whatsapp);
      }
      if (payload.social) {
        payload.social = normalizeSocial(payload.social);
      }
      if (payload.footer !== undefined) {
        payload.footer = normalizeFooter(payload.footer);
      }
      if (payload.nav !== undefined) {
        payload.nav = normalizeNav(payload.nav);
      }

      const site = await SiteSettings.findOneAndUpdate(
        { key: "site" },
        { $set: payload },
        { upsert: true, new: true }
      ).lean();
      return res.status(200).json(normalizeSiteForAdmin(stripSiteMeta(site)));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Site settings error:", error);
    return res.status(500).json({ error: "Failed to update site settings" });
  }
}
