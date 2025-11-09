-- Fix the search_path for the cleanup function
DROP FUNCTION IF EXISTS public.cleanup_expired_otps();

CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW();
END;
$$;