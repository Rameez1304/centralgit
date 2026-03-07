import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    console.log('KEY EXISTS:', !!process.env.OPENAI_API_KEY)

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: 'Reply only with: OPENAI_WORKING_NOW'
    })

    return NextResponse.json({
      reviews: [response.output_text]
    })

  } catch (err: any) {
    console.error('ERROR MESSAGE:', err?.message)
    console.error('ERROR STATUS:', err?.status)
    console.error('ERROR NAME:', err?.name)

    return NextResponse.json({
      reviews: ['OPENAI_FAILED']
    })
  }
}
