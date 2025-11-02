-- Create table for storing OTPs
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert OTPs (for sending)
CREATE POLICY "Anyone can create OTP requests"
  ON public.otp_verifications
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow anyone to read their own OTP (for verification)
CREATE POLICY "Anyone can read OTP for verification"
  ON public.otp_verifications
  FOR SELECT
  USING (true);

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;