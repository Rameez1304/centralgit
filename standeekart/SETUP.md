# ReviewPilot AI — Setup & Deployment Guide

## Prerequisites
- Node.js 18+
- A Supabase account (free tier works)
- An OpenAI API key
- A Vercel account (free tier works)

---

## 1. Local Development

### Clone & Install
```bash
git clone <your-repo>
cd reviewpilot
npm install
```

### Environment Variables
Copy the example file and fill in your values:
```bash
cp .env.example .env.local
```

Open `.env.local` and set:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run locally
```bash
npm run dev
```
Visit http://localhost:3000

---

## 2. Supabase Setup

1. Go to https://supabase.com and create a new project
2. Once created, go to **SQL Editor** → **New Query**
3. Paste the contents of `supabase/migration.sql` and click **Run**
4. Verify: go to **Table Editor** — you should see a `businesses` table

### Get your credentials
- Go to **Project Settings** → **API**
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 3. OpenAI Setup

1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Copy the key → `OPENAI_API_KEY`

> The app uses `gpt-4o`. Make sure your account has access. 
> For lower cost during development, change `gpt-4o` to `gpt-4o-mini` in `app/api/generate-review/route.ts`.

---

## 4. Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the prompts. On first deploy it will ask for your project settings.

### Option B: Vercel Dashboard
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no configuration needed

### Set environment variables on Vercel
In your Vercel project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `OPENAI_API_KEY` | Your OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL (e.g. `https://reviewpilot.vercel.app`) |

Then redeploy (Vercel → your project → **Redeploy**).

---

## 5. User Flow

1. Business owner visits `/create`
2. Fills in business name, category, Google review link, tone
3. Clicks **Create QR Code**
4. Business is saved to Supabase; QR is generated
5. Owner downloads QR (PNG or SVG) and displays it
6. Customer scans QR → lands on `/review/[slug]`
7. Customer clicks **Generate Review Suggestions**
8. 5 AI reviews appear as editable cards
9. Customer picks one, optionally edits, clicks **Post to Google**
10. Customer is redirected to the Google review page

---

## 6. Project Structure

```
reviewpilot/
├── app/
│   ├── page.tsx                    ← Landing page
│   ├── layout.tsx                  ← Root layout + metadata
│   ├── globals.css                 ← Tailwind + custom styles
│   ├── not-found.tsx               ← 404 page
│   ├── create/
│   │   └── page.tsx                ← Business form page
│   ├── review/
│   │   └── [slug]/
│   │       ├── page.tsx            ← Server: fetch business
│   │       └── ReviewClient.tsx    ← Client: AI review flow
│   └── api/
│       ├── generate-review/
│       │   └── route.ts            ← OpenAI review generation
│       └── generate-qr/
│           └── route.ts            ← QR code generation
├── components/
│   └── QRResult.tsx                ← QR display + download
├── lib/
│   ├── supabase.ts                 ← Supabase client
│   └── utils.ts                   ← Slug generation, helpers
├── types/
│   └── index.ts                   ← TypeScript types
├── supabase/
│   └── migration.sql               ← Database setup SQL
├── .env.example                    ← Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. Customisation

### Change AI model
In `app/api/generate-review/route.ts`, change:
```ts
model: 'gpt-4o',        // most capable
model: 'gpt-4o-mini',   // cheaper, still great for reviews
```

### Add more categories
In `app/create/page.tsx`, add to the `CATEGORIES` array.

### Add more tones
Add to the `TONES` array in `app/create/page.tsx` and the `TONE_INSTRUCTIONS` map in the API route.
