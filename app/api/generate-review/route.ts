import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json({
    reviews: [
      'Amazing service and very professional experience. Highly recommended.',
      'Really impressed with the quality and smooth overall experience.',
      'Friendly staff and excellent attention to detail.',
      'Everything was handled professionally and efficiently.',
      'Very satisfied and would definitely recommend to others.',
    ],
  })
}
