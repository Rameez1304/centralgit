import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    reviews: [
      'Amazing service and very professional experience.',
      'Friendly staff and smooth process.',
      'Really impressed with the quality.',
      'Very satisfied and would recommend.',
      'Excellent overall experience.'
    ]
  })
}
