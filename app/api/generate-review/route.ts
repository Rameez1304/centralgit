import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { GenerateReviewRequest, GenerateReviewResponse } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const fallbackReviews = [
  'Amazing experience and very professional service. Highly recommended.',
  'Really impressed with the quality and smooth overall experience.',
  'Friendly staff and excellent attention to detail.',
  'Everything was handled professionally and efficiently.',
  'Very satisfied and would definitely recommend to others.',
]

const TONE_INSTRUCTIONS: Record<string, string> = {
  friendly: 'warm and conversational',
  professional: 'professional and credible',
  short: 'brief and direct',
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateReviewRequest = await req.json()
    const { businessName, category, tone } = body

    if (!businessName || !category || !tone) {
      return NextResponse.json(
        { reviews: fallbackReviews },
        { status: 200 }
      )
    }

    const toneInstruction = TONE_INSTRUCTIONS[tone] || 'warm and conversational'

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.8,
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content:
              'Generate 5 natural Google reviews. Return only JSON array of strings.',
          },
          {
            role: 'user',
            content: `Generate 5 ${toneInstruction} Google reviews for ${businessName}, a ${category}.`,
          },
        ],
      })

      const raw = completion.choices[0]?.message?.content || '[]'
      const cleaned = raw.replace(/```json|```/g, '').trim()

      let reviews: string[] = []

      try {
        reviews = JSON.parse(cleaned)
      } catch {
        reviews = fallbackReviews
      }

      if (!Array.isArray(reviews) || reviews.length === 0) {
        reviews = fallbackReviews
      }

      const response: GenerateReviewResponse = {
        reviews: reviews.slice(0, 5),
      }

      return NextResponse.json(response)
    } catch {
      return NextResponse.json(
        { reviews: fallbackReviews },
        { status: 200 }
      )
    }
  } catch {
    return NextResponse.json(
      { reviews: fallbackReviews },
      { status: 200 }
    )
  }
}
