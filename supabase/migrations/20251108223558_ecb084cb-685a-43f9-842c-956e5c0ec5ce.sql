-- Create table to track contact form submissions for rate limiting
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to insert submissions
CREATE POLICY "Service role can insert submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Create policy for service role to read submissions
CREATE POLICY "Service role can read submissions"
ON public.contact_submissions
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_contact_submissions_email_time 
ON public.contact_submissions(email, submitted_at DESC);

-- Function to clean up old submissions (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.contact_submissions
  WHERE submitted_at < NOW() - INTERVAL '24 hours';
END;
$$;