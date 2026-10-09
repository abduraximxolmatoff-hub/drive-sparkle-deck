CREATE TABLE public.scan_usage (user_id uuid NOT NULL, day date NOT NULL, count integer NOT NULL DEFAULT 0, PRIMARY KEY (user_id, day));
GRANT SELECT ON public.scan_usage TO authenticated;
GRANT ALL ON public.scan_usage TO service_role;
ALTER TABLE public.scan_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own scan usage" ON public.scan_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);