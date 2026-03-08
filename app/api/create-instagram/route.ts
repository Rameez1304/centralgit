import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabase'
import { generateUniqueSlug } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      business_name,
      category,
      instagram_url,
    } = body

    if (!business_name || !category || !instagram_url) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      )
    }

    const slug = generateUniqueSlug(business_name)

    const { error } = await supabase
      .from('instagram_links')
      .insert({
        business_name,
        category,
        instagram_url,
        slug,
      })

    if (error) {
      return NextResponse.json(
        { error: 'Database failed' },
        { status: 500 }
      )
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://www.standeekart.com'

    const pageUrl = `${appUrl}/instagram/${slug}`

    const qrDataUrl = await QRCode.toDataURL(pageUrl)

    return NextResponse.json({
      qrDataUrl,
      slug,
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }
}
