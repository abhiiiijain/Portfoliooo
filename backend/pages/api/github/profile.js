import dbConnect from "../../../lib/mongodb";
import SiteSettings from "../../../models/SiteSettings";
import { setCorsHeaders } from "../../../lib/cors";
import { fetchGitHubProfileCached } from "../../../lib/github";
import { parseGitHubUsername } from "@portfoliooo/shared/social";

export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const site = await SiteSettings.findOne({ key: "site" }).lean();
    const username = parseGitHubUsername(site?.social?.github);

    if (!username) {
      return res.status(404).json({ error: "GitHub username not configured" });
    }

    const profile = await fetchGitHubProfileCached(username);
    if (!profile) {
      return res.status(502).json({ error: "Failed to fetch GitHub profile" });
    }

    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=300");
    return res.status(200).json(profile);
  } catch (error) {
    console.error("GitHub profile error:", error);
    return res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
}
