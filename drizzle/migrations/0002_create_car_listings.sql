CREATE TABLE public.car_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  seller_name text NOT NULL CHECK (char_length(seller_name) BETWEEN 2 AND 40),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  brand text NOT NULL CHECK (char_length(brand) BETWEEN 2 AND 40),
  model text NOT NULL CHECK (char_length(model) BETWEEN 1 AND 40),
  year int NOT NULL CHECK (year BETWEEN 1970 AND 2030),
  price_usd int NOT NULL CHECK (price_usd > 0),
  mileage_km int NOT NULL DEFAULT 0 CHECK (mileage_km >= 0),
  city text NOT NULL CHECK (char_length(city) BETWEEN 2 AND 60),
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  description text CHECK (char_length(description) <= 500),
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.car_listings TO anon;
GRANT SELECT, INSERT, DELETE ON public.car_listings TO authenticated;
GRANT ALL ON public.car_listings TO service_role;
ALTER TABLE public.car_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view listings" ON public.car_listings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users add own listings" ON public.car_listings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND is_demo = false);
CREATE POLICY "Users delete own listings" ON public.car_listings FOR DELETE TO authenticated USING (auth.uid() = user_id);
INSERT INTO public.car_listings (seller_name, phone, brand, model, year, price_usd, mileage_km, city, latitude, longitude, description, is_demo) VALUES
('Aziz', '+998901112233', 'Chevrolet', 'Cobalt', 2021, 11500, 48000, 'Toshkent, Chilonzor', 41.2856, 69.2034, 'Ideal holatda, bitta egasi.', true),
('Dilshod', '+998935554466', 'Chevrolet', 'Gentra', 2020, 12800, 62000, 'Toshkent, Yunusobod', 41.3650, 69.2870, 'Avtomat, kraska toza.', true),
('Malika', '+998977778899', 'Chevrolet', 'Tracker', 2023, 21500, 15000, 'Toshkent, Mirzo Ulug''bek', 41.3260, 69.3350, 'Premier komplektatsiya.', true),
('Sardor', '+998901234567', 'BMW', 'X5', 2019, 48000, 70000, 'Toshkent, Yakkasaroy', 41.2900, 69.2610, 'Servis tarixi bor.', true),
('Javohir', '+998909876543', 'Mercedes-Benz', 'E-Class', 2018, 36000, 85000, 'Toshkent, Shayxontohur', 41.3270, 69.2280, 'Rasmiy dilerdan.', true),
('Nodira', '+998946667788', 'Chevrolet', 'Malibu', 2022, 27500, 30000, 'Toshkent, Sergeli', 41.2290, 69.2200, 'Turbo, to''liq paket.', true),
('Bekzod', '+998933332211', 'Mercedes-Benz', 'G-Class', 2020, 145000, 40000, 'Toshkent, Mirobod', 41.2950, 69.2830, 'G63, ideal.', true),
('Ulug''bek', '+998911119900', 'Chevrolet', 'Tahoe', 2021, 62000, 55000, 'Samarqand', 39.6542, 66.9597, 'Oilaviy, 8 o''rinli.', true);