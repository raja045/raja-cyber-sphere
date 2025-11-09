require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory store for OTPs: { phone: { code, expiresAt } }
const otps = new Map();

// Optional Twilio integration
const useTwilio = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM);
let twilioClient = null;
if (useTwilio) {
  const twilio = require('twilio');
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log('Twilio enabled for SMS sending.');
} else {
  console.log('Twilio not configured. OTPs will be logged in server console (development only).');
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body || {};
  if (!phone || typeof phone !== 'string') {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const code = generateOtp();
  const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes
  otps.set(phone, { code, expiresAt });

  try {
    if (useTwilio) {
      await twilioClient.messages.create({
        body: `Your verification code is ${code}`,
        from: process.env.TWILIO_FROM,
        to: phone,
      });
    } else {
      console.info(`Simulated: OTP for ${phone} is ${code}`);
    }

    return res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error('Error sending OTP', err);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { phone, code } = req.body || {};
  if (!phone || typeof phone !== 'string' || !code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Phone and code are required' });
  }

  const entry = otps.get(phone);
  if (!entry) {
    return res.status(400).json({ error: 'No OTP requested for this phone' });
  }

  if (Date.now() > entry.expiresAt) {
    otps.delete(phone);
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (entry.code !== code) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // verification success; remove OTP
  otps.delete(phone);
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`OTP server listening on port ${PORT}`);
});
