CREATE TABLE public.user_cars (
  user_id uuid PRIMARY KEY,
  brand_slug text NOT NULL,
  model_slug text NOT NULL,
  year int NOT NULL,
  current_km int,
  km_updated_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_cars TO authenticated;
GRANT ALL ON public.user_cars TO service_role;
ALTER TABLE public.user_cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own car" ON public.user_cars FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.part_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  part_id text NOT NULL,
  last_date date,
  last_km int,
  interval_km int,
  interval_months int,
  enabled boolean NOT NULL DEFAULT true,
  last_notified text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, part_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.part_reminders TO authenticated;
GRANT ALL ON public.part_reminders TO service_role;
ALTER TABLE public.part_reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own reminders" ON public.part_reminders FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT ALL ON public.push_subscriptions TO service_role;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own subscriptions" ON public.push_subscriptions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);