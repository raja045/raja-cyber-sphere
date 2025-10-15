# OTP Server (development)

This small Express server provides two endpoints for OTP flow used by the portfolio site:

- POST /api/send-otp { phone }
- POST /api/verify-otp { phone, code }

It stores OTPs in memory (not persistent) and expires them after 5 minutes. For development it will log the OTP to the server console. For production, configure Twilio environment variables to send real SMS.

Environment variables (create a `.env` file):

- PORT (optional)
- TWILIO_ACCOUNT_SID (optional)
- TWILIO_AUTH_TOKEN (optional)
- TWILIO_FROM (optional) — the sender phone number registered with Twilio

Install and run:

```bash
cd server
npm install
npm run dev
```

The frontend should call this server (e.g., http://localhost:4000/api/send-otp).
