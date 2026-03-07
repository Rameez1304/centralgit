import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import type { GenerateReviewRequest, GenerateReviewResponse } from '@/types'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
Write 5 Google reviews for "${businessName}", a ${category}.

Tone: ${toneInstruction}

Rules:
- Sound like a real customer
- Use natural variation
- Mention believable details
- Never repeat phrases
- Return ONLY JSON array

Example:
["review 1", "review 2", "review 3", "review 4", "review 5"]
      `,
    })

    const raw = response.text ?? '[]'
    const cleaned = raw.replace(/```json|```/g, '').trim()

    let reviews: string[]

    try {
      reviews = JSON.parse(cleaned)
    } catch {
      const matches = cleaned.match(/"([^"]+)"/g)
      reviews = matches ? matches.map((s) => s.slice(1, -1)) : []
    }

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return NextResponse.json({ error: 'Failed to parse reviews' }, { status: 500 })
    }

    const result: GenerateReviewResponse = {
      reviews: reviews.slice(0, 5),
    }

    return NextResponse.json(result)

  } catch (err: any) {
    console.error('[generate-review]', err?.message)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
