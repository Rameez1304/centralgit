import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate 5 natural Google reviews for ${body.businessName}, a ${body.category}. Return only JSON array.`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content || '[]'

    const reviews = JSON.parse(raw)

    return NextResponse.json({ reviews })
  } catch {
    return NextResponse.json({
      reviews: [
        'Had a very smooth experience from start to finish.',
        'Very professional and easy to deal with.',
        'Friendly service and good attention to detail.',
        'Overall a very positive experience.',
        'Would definitely recommend to others.',
      ],
    })
  }
}
