import { createOtpSession, generateOtp, sendSms } from "./lib/otp";

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

    if (!phone || typeof phone !== "string") {
      return Response.json({ error: "Phone number is required" }, { status: 400 });
    }

    const code = generateOtp();
    const { sessionToken } = await createOtpSession(phone, code);
    const sms = await sendSms(phone, code);

    if (sms.simulated) {
      console.info(`Simulated OTP for ${phone}: ${code}`);
    }

    return Response.json({
      success: true,
      message: sms.simulated ? "OTP sent (simulated)" : "OTP sent",
      sessionToken,
      simulated: sms.simulated,
      ...(sms.simulated ? { demoCode: code } : {}),
    });
  } catch (error) {
    console.error("send-otp error:", error);
    return Response.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
