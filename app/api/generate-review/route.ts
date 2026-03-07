import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    console.log('KEY EXISTS:', !!process.env.OPENAI_API_KEY)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: 'Reply only with: OPENAI_WORKING_NOW'
        }
      ]
    })

    const text = completion.choices[0]?.message?.content || 'NO_RESPONSE'

    return NextResponse.json({
      reviews: [text]
    })

  } catch (err: any) {
    console.error('FULL OPENAI ERROR:', JSON.stringify(err, null, 2))

    return NextResponse.json({
      reviews: ['OPENAI_FAILED']
    })
  }
}
