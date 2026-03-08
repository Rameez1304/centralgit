import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName } = body

    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name required' },
        { status: 400 }
      )
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
Write one short Instagram comment for a customer reacting naturally to a business called "${businessName}".

Rules:
- human tone
- short
- natural
- no hashtags
- no quotation marks
      `,
    })

    const comment = response.text?.trim() || 'Loved this ❤️'

    return NextResponse.json({ comment })

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
