import dbConnect from "../../lib/mongodb";
import ContactInquiry from "../../models/ContactInquiry";
import { setCorsHeaders } from "../../lib/cors";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    await dbConnect();
    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "Portfolio contact",
      message: message.trim(),
      source: "portfolio",
      submittedAt: new Date(),
    });

    return res.status(201).json({ success: true, id: inquiry._id.toString() });
  } catch (error) {
    console.error("Failed to save contact inquiry:", error);
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
}
