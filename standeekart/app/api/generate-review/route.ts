import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { GenerateReviewRequest, GenerateReviewResponse } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const TONE_INSTRUCTIONS: Record<string, string> = {
  friendly: 'warm, personal, and conversational — like a friend recommending a place',
  professional: 'polished, credible, and specific — like a professional leaving a thoughtful review',
  short: 'brief and punchy — 1-2 sentences max, casual and direct',
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateReviewRequest = await req.json()
    const { businessName, category, tone } = body

    if (!businessName || !category || !tone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const toneInstruction = TONE_INSTRUCTIONS[tone] ?? TONE_INSTRUCTIONS.friendly

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1000,
      temperature: 0.85,
      messages: [
        {
          role: 'system',
          content: `You write authentic-sounding Google reviews. Each review must:
- Sound like a real customer, not AI
- Be varied in structure, length, and vocabulary (unless tone is "short")
- Mention specific, believable details about the experience
- Never repeat the same phrases across reviews
- Never use em dashes
Return ONLY a JSON array of exactly 5 review strings. No other text.`,
        },
        {
          role: 'user',
          content: `Write 5 Google reviews for "${businessName}", a ${category}.
Tone: ${toneInstruction}
Return format: ["review 1", "review 2", "review 3", "review 4", "review 5"]`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? '[]'
    const cleaned = raw.replace(/```json|```/g, '').trim()

    let reviews: string[]
    try {
      reviews = JSON.parse(cleaned)
    } catch {
      // Fallback: extract quoted strings
      const matches = cleaned.match(/"([^"]+)"/g)
      reviews = matches ? matches.map((s) => s.slice(1, -1)) : []
    }

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return NextResponse.json({ error: 'Failed to parse reviews' }, { status: 500 })
    }

    const response: GenerateReviewResponse = { reviews: reviews.slice(0, 5) }
    return NextResponse.json(response)
  } catch (err) {
    console.error('[generate-review]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
