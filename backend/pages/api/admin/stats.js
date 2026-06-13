import dbConnect from "../../../lib/mongodb";
import ContactInquiry from "../../../models/ContactInquiry";
import { requireAdmin } from "../../../lib/auth";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    await dbConnect();

    const [totalLeads, recentLeads] = await Promise.all([
      ContactInquiry.countDocuments(),
      ContactInquiry.find().sort({ submittedAt: -1 }).limit(5).lean(),
    ]);

    return res.status(200).json({
      totalLeads,
      recentLeads: recentLeads.map((lead) => ({
        id: lead._id.toString(),
        name: lead.name,
        email: lead.email,
        submittedAt: lead.submittedAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ error: "Failed to load stats" });
  }
}
