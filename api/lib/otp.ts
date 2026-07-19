const OTP_TTL_MS = 5 * 60 * 1000;

function getSecret(): string {
  return process.env.OTP_SECRET || "portfolio-otp-secret";
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function createOtpSession(phone: string, code: string) {
  const expiresAt = Date.now() + OTP_TTL_MS;
  const payload = JSON.stringify({ phone, code, exp: expiresAt });
  const key = await importHmacKey(getSecret());
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const sessionToken = `${toBase64Url(new TextEncoder().encode(payload))}.${toBase64Url(new Uint8Array(signature))}`;
  return { sessionToken, expiresAt };
}

export async function verifyOtpSession(sessionToken: string, phone: string, code: string) {
  const [payloadPart, signaturePart] = sessionToken.split(".");
  if (!payloadPart || !signaturePart) {
    throw new Error("Invalid session");
  }

  const payloadBytes = fromBase64Url(payloadPart);
  const payload = new TextDecoder().decode(payloadBytes);
  const key = await importHmacKey(getSecret());
  const signature = fromBase64Url(signaturePart);
  const valid = await crypto.subtle.verify("HMAC", key, signature, payloadBytes);

  if (!valid) {
    throw new Error("Invalid session");
  }

  const data = JSON.parse(payload) as { phone: string; code: string; exp: number };

  if (data.phone !== phone) {
    throw new Error("Phone mismatch");
  }

  if (Date.now() > data.exp) {
    throw new Error("OTP expired");
  }

  if (data.code !== code) {
    throw new Error("Invalid OTP");
  }

  return true;
}

export async function sendSms(phone: string, code: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!sid || !token || !from) {
    return { simulated: true as const };
  }

  const auth = btoa(`${sid}:${token}`);
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: phone,
      From: from,
      Body: `Your verification code is ${code}`,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to send SMS");
  }

  return { simulated: false as const };
}

export { generateOtp };
