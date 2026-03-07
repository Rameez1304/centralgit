-- ============================================================
-- ReviewPilot AI — Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── BUSINESSES TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.businesses (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_name       TEXT NOT NULL,
  category            TEXT NOT NULL,
  google_review_link  TEXT NOT NULL,
  tone                TEXT NOT NULL DEFAULT 'friendly'
                        CHECK (tone IN ('friendly', 'professional', 'short')),
  slug                TEXT NOT NULL UNIQUE,
  created_at          TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast slug lookups (used on every QR scan)
CREATE INDEX IF NOT EXISTS businesses_slug_idx ON public.businesses (slug);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
-- For MVP, allow public read and insert (no auth required).
-- Add auth-based policies when you introduce user accounts.

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Anyone can read a business (needed for /review/[slug] page)
CREATE POLICY "Public read businesses"
  ON public.businesses
  FOR SELECT
  USING (true);

-- Anyone can create a business (MVP: no auth)
CREATE POLICY "Public insert businesses"
  ON public.businesses
  FOR INSERT
  WITH CHECK (true);

-- ── VERIFY ───────────────────────────────────────────────────
-- Run this to confirm the table was created:
-- SELECT * FROM public.businesses LIMIT 5;
