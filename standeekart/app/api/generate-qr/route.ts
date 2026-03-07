import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabase'
import { generateUniqueSlug } from '@/lib/utils'
import type { CreateBusinessRequest, CreateBusinessResponse } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: CreateBusinessRequest = await req.json()
    const { business_name, category, google_review_link, tone } = body

    if (!business_name || !category || !google_review_link || !tone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Validate Google review link
    if (!google_review_link.startsWith('http')) {
      return NextResponse.json({ error: 'Google review link must be a valid URL' }, { status: 400 })
    }

    const slug = generateUniqueSlug(business_name)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const reviewPageUrl = `${appUrl}/review/${slug}`

    // Save to Supabase
    const { data: business, error: dbError } = await supabase
      .from('businesses')
      .insert({ business_name, category, google_review_link, tone, slug })
      .select()
      .single()

    if (dbError) {
      console.error('[generate-qr] DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save business' }, { status: 500 })
    }

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(reviewPageUrl, {
      width: 400,
      margin: 2,
      color: { dark: '#0D0D0D', light: '#FFFFFF' },
      errorCorrectionLevel: 'H',
    })

    const response: CreateBusinessResponse = { business, qrDataUrl }
    return NextResponse.json(response)
  } catch (err) {
    console.error('[generate-qr]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
