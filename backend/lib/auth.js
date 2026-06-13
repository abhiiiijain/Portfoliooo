import jwt from "jsonwebtoken";
import { setCorsHeaders } from "./cors";

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

export function requireAdmin(req, res) {
  if (setCorsHeaders(req, res)) return false;

  const token = getTokenFromRequest(req);
  const payload = verifyAdminToken(token);

  if (!payload) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }

  return true;
}
