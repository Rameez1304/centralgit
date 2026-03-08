import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

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

    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0D0D0D',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })

    return NextResponse.json({ qrDataUrl })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
