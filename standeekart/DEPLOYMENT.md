# ReviewPilot AI — Deployment Guide

## Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- OpenAI API key
- Vercel account (free tier works)

---

## Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your **Project URL** and **anon public key** from:
   `Settings → API → Project URL / anon key`
3. Open the **SQL Editor** and run the contents of `supabase-setup.sql`
4. Verify the `businesses` table was created under **Table Editor**

---

## Step 2: OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com) → API Keys
2. Create a new secret key
3. Make sure your account has GPT-4o access (or change model to `gpt-3.5-turbo` in `app/api/generate-review/route.ts`)

---

## Step 3: Local Development

```bash
# Clone and install
git clone <your-repo>
cd reviewpilot-ai
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run dev server
npm run dev
# → http://localhost:3000
```

---

## Step 4: Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel

# Follow prompts, then add env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL  # your vercel domain

vercel --prod
```

### Option B — Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL e.g. `https://reviewpilot.vercel.app`)
4. Deploy

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `OPENAI_API_KEY` | ✅ | OpenAI API secret key |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your app URL (for QR code links) |

---

## Folder Structure

```
reviewpilot-ai/
├── app/
│   ├── api/
│   │   ├── generate-review/route.ts   ← OpenAI review generation
│   │   └── generate-qr/route.ts       ← QR + Supabase save
│   ├── review/[slug]/
│   │   ├── page.tsx                   ← Server: fetches business
│   │   ├── ReviewPageClient.tsx       ← Client: review flow UI
│   │   └── not-found.tsx              ← 404 for bad slugs
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                       ← Landing page
├── components/
│   ├── BusinessForm.tsx               ← QR creation form
│   └── QRResult.tsx                   ← QR display + download
├── lib/
│   ├── supabase.ts                    ← Supabase client
│   └── utils.ts                       ← slugify, cn helpers
├── types/index.ts                     ← Shared TypeScript types
├── supabase-setup.sql                 ← Run in Supabase SQL editor
├── .env.example                       ← Environment template
└── DEPLOYMENT.md                      ← This file
```

---

## Common Issues

**QR code links to localhost in production**
→ Make sure `NEXT_PUBLIC_APP_URL` is set to your production domain

**Supabase "permission denied" error**
→ Check that RLS policies were created by re-running `supabase-setup.sql`

**OpenAI 429 rate limit**
→ Check your OpenAI usage limits; the GPT-4o model requires a paid account

**Reviews not generating**
→ Verify `OPENAI_API_KEY` is set correctly in Vercel environment variables (not just .env.local)
