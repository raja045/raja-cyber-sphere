import { verifyOtpSession } from "./lib/otp";

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const phone = body?.phone;
    const code = body?.code;
    const sessionToken = body?.sessionToken;

    if (!phone || typeof phone !== "string" || !code || typeof code !== "string") {
      return Response.json({ error: "Phone and code are required" }, { status: 400 });
    }

    if (!sessionToken || typeof sessionToken !== "string") {
      return Response.json({ error: "No OTP requested for this phone" }, { status: 400 });
    }

    await verifyOtpSession(sessionToken, phone, code);
    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid OTP";
    const status =
      message === "OTP expired" || message === "Invalid OTP" || message === "Phone mismatch"
        ? 400
        : 400;

    return Response.json({ error: message }, { status });
  }
}
