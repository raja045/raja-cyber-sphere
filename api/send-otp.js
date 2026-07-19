import crypto from "node:crypto";

// Stateless OTP for serverless (Vercel). Serverless functions do not share
// in-memory state between invocations, so instead of storing the code server
// side we return an HMAC-signed token that encodes a hash of the code and its
// expiry. The plain code is delivered out-of-band (Twilio SMS, or logged in
// dev) and the client sends the token back to /api/verify-otp.
const OTP_SECRET = process.env.OTP_SECRET || "dev-insecure-otp-secret-change-me";
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

const sign = (body) =>
  crypto.createHmac("sha256", OTP_SECRET).update(body).digest("base64url");

const hashCode = (phone, code) =>
  crypto.createHash("sha256").update(`${phone}:${code}:${OTP_SECRET}`).digest("base64url");

const generateOtp = () => String(crypto.randomInt(100000, 1000000));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body || {};
  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const code = generateOtp();
  const expiresAt = Date.now() + OTP_TTL_MS;
  const body = Buffer.from(
    JSON.stringify({ phone, codeHash: hashCode(phone, code), expiresAt })
  ).toString("base64url");
  const token = `${body}.${sign(body)}`;

  const useTwilio = !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_FROM
  );

  try {
    if (useTwilio) {
      // Loaded lazily so the (optional) dependency is only required in prod.
      const { default: twilio } = await import("twilio");
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: `Your verification code is ${code}`,
        from: process.env.TWILIO_FROM,
        to: phone,
      });
    } else {
      console.info(`Simulated: OTP for ${phone} is ${code}`);
    }

    return res.status(200).json({ success: true, message: "OTP sent", token });
  } catch (err) {
    console.error("Error sending OTP", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}
