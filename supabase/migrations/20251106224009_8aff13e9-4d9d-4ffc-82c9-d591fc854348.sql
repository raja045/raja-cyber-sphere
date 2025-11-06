-- Create site_stats table to track visitor count
CREATE TABLE IF NOT EXISTS public.site_stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_count bigint NOT NULL DEFAULT 0,
  last_updated timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the stats
CREATE POLICY "Anyone can read site stats"
ON public.site_stats
FOR SELECT
TO public
USING (true);

-- Only allow service role to update (via edge function)
CREATE POLICY "Only service role can update stats"
ON public.site_stats
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Insert initial row if not exists
INSERT INTO public.site_stats (visitor_count)
VALUES (0)
ON CONFLICT DO NOTHING;

-- Create function to increment visitor count
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE public.site_stats
  SET 
    visitor_count = visitor_count + 1,
    last_updated = now()
  WHERE id = (SELECT id FROM public.site_stats LIMIT 1)
  RETURNING visitor_count INTO new_count;
  
  RETURN new_count;
END;
$$;