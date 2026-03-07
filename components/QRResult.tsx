import React from 'react'

type Business = {
  id: string
  business_name: string
  category: string
  google_review_link: string
  tone: string
  slug: string
}

type Props = {
  business: Business
}

export default function QRResult({ business }: Props) {
  const qrUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/review/${business.slug}`

  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">QR Generated Successfully</h2>

      <p className="mb-2">
        <strong>Business:</strong> {business.business_name}
      </p>

      <p className="mb-4">
        <strong>Review Page:</strong> /review/{business.slug}
      </p>

      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
        alt="QR Code"
        className="mb-4"
      />

      <a
        href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}`}
        download
        className="inline-block rounded-lg px-4 py-2 border"
      >
        Download QR
      </a>
    </div>
  )
}
