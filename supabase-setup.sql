-- ================================================================
-- ReviewPilot AI — Supabase Setup SQL
-- Run this in your Supabase SQL Editor
-- ================================================================

-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name   TEXT NOT NULL,
  category        TEXT NOT NULL,
  google_review_link TEXT NOT NULL,
  tone            TEXT NOT NULL DEFAULT 'friendly'
                  CHECK (tone IN ('friendly', 'professional', 'short')),
  slug            TEXT NOT NULL UNIQUE,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast slug lookups (used on every QR scan)
CREATE INDEX IF NOT EXISTS businesses_slug_idx ON public.businesses (slug);

-- Enable Row Level Security
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (needed for /review/[slug] public page)
CREATE POLICY "Public read businesses"
  ON public.businesses
  FOR SELECT
  TO anon
  USING (true);

-- Allow anyone to insert (business form is public for MVP)
CREATE POLICY "Public insert businesses"
  ON public.businesses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ================================================================
-- Verify setup
-- ================================================================
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'businesses'
ORDER BY ordinal_position;
