import crypto from "node:crypto";

// Verifies the stateless token issued by /api/send-otp. See that file for the
// design rationale (serverless functions cannot share in-memory OTP state).
const OTP_SECRET = process.env.OTP_SECRET || "dev-insecure-otp-secret-change-me";

const sign = (body) =>
  crypto.createHmac("sha256", OTP_SECRET).update(body).digest("base64url");

const hashCode = (phone, code) =>
  crypto.createHash("sha256").update(`${phone}:${code}:${OTP_SECRET}`).digest("base64url");

const safeEqual = (a, b) => {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, code, token } = req.body || {};
  if (!phone || typeof phone !== "string" || !code || typeof code !== "string") {
    return res.status(400).json({ error: "Phone and code are required" });
  }
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return res.status(400).json({ error: "No OTP requested for this phone" });
  }

  const [body, sig] = token.split(".");
  if (!safeEqual(sig, sign(body))) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  if (Date.now() > payload.expiresAt) {
    return res.status(400).json({ error: "OTP expired" });
  }
  if (payload.phone !== phone) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  if (!safeEqual(payload.codeHash, hashCode(phone, code))) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  return res.status(200).json({ success: true });
}
