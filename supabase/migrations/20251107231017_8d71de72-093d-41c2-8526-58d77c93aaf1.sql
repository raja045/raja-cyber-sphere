-- Create table to track unique visitors
CREATE TABLE IF NOT EXISTS public.unique_visitors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL UNIQUE,
  first_visit timestamp with time zone NOT NULL DEFAULT now(),
  last_visit timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.unique_visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can read unique visitors"
ON public.unique_visitors
FOR SELECT
TO public
USING (true);

-- Only service role can insert/update
CREATE POLICY "Service role can insert unique visitors"
ON public.unique_visitors
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update unique visitors"
ON public.unique_visitors
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to track unique visitor
CREATE OR REPLACE FUNCTION public.track_unique_visitor(p_visitor_id text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_is_new boolean;
  v_count bigint;
BEGIN
  -- Check if visitor exists
  SELECT EXISTS(SELECT 1 FROM public.unique_visitors WHERE visitor_id = p_visitor_id)
  INTO v_is_new;
  
  v_is_new := NOT v_is_new;
  
  -- Insert or update visitor record
  INSERT INTO public.unique_visitors (visitor_id, first_visit, last_visit)
  VALUES (p_visitor_id, now(), now())
  ON CONFLICT (visitor_id) 
  DO UPDATE SET last_visit = now();
  
  -- If new visitor, increment the counter
  IF v_is_new THEN
    UPDATE public.site_stats
    SET 
      visitor_count = visitor_count + 1,
      last_updated = now()
    WHERE id = (SELECT id FROM public.site_stats LIMIT 1)
    RETURNING visitor_count INTO v_count;
  ELSE
    -- Just get current count
    SELECT visitor_count INTO v_count
    FROM public.site_stats
    LIMIT 1;
  END IF;
  
  RETURN jsonb_build_object(
    'visitor_count', v_count,
    'is_new_visitor', v_is_new
  );
END;
$$;