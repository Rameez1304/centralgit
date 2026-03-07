import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Reply only with: GEMINI_WORKING_NOW'
    })

    return NextResponse.json({
      reviews: [response.text]
    })

  } catch (err: any) {
    console.error('GEMINI ERROR:', err?.message)

    return NextResponse.json({
      reviews: ['GEMINI_FAILED']
    })
  }
}
