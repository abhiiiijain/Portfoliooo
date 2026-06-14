import dbConnect from "../../lib/mongodb";
import ContactInquiry from "../../models/ContactInquiry";
import { setCorsHeaders } from "../../lib/cors";
import { isValidFormattedPhone } from "@portfoliooo/shared/phone";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, phone, and message are required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const normalizedPhone = phone.trim();
  if (!isValidFormattedPhone(normalizedPhone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    await dbConnect();
    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: normalizedPhone,
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
