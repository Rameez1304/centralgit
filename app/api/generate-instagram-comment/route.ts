import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, category } = body

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write 5 short Instagram comments for "${businessName}", a ${category}. Return ONLY JSON array.`,
    })

    const raw = response.text ?? '[]'

    console.log('RAW GEMINI:', raw)

    const cleaned = raw.replace(/```json|```/g, '').trim()

    let comments: string[]

    try {
      comments = JSON.parse(cleaned)
    } catch {
      comments = ['Loved this ❤️', 'Looks amazing 🔥', 'Very nice 👏']
    }

    return NextResponse.json({
      comments,
    })

  } catch (err) {
    console.error('GEMINI ERROR:', err)

    return NextResponse.json({
      comments: ['Loved this ❤️', 'Looks amazing 🔥', 'Very nice 👏']
    })
  }
}
