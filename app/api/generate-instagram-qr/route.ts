import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabase'
import { generateUniqueSlug } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Valid URL required' },
        { status: 400 }
      )
    }

    const slug = generateUniqueSlug('instagram')

    const { error } = await supabase
      .from('instagram_links')
      .insert({
        slug,
        instagram_url: url
      })

    if (error) {
      console.error(error)

      return NextResponse.json(
        { error: 'Database insert failed' },
        { status: 500 }
      )
    }

    const landingUrl =
      `https://www.standeekart.com/instagram/${slug}`

    const qrDataUrl = await QRCode.toDataURL(landingUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0D0D0D',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })

    return NextResponse.json({
      qrDataUrl,
      slug
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
