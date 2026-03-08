import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, category } = body

    if (!businessName || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
Write 5 short Instagram comments for "${businessName}", a ${category}.

Rules:
- natural human tone
- 4 to 10 words
- sound like real customers
- vary each comment
- no hashtags
- return ONLY JSON array

Example:
["Loved this ❤️", "Looks amazing 🔥", "Need to visit soon", "Very nice vibe 👏", "So good ❤️"]
      `,
    })

    const raw = response.text ?? '[]'
    const cleaned = raw.replace(/```json|```/g, '').trim()

    let comments: string[]

    try {
      comments = JSON.parse(cleaned)
    } catch {
      const matches = cleaned.match(/"([^"]+)"/g)
      comments = matches ? matches.map((s) => s.slice(1, -1)) : []
    }

    return NextResponse.json({
      comments: comments.slice(0, 5),
    })

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
