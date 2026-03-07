import React from 'react'

type Business = {
  id?: string
  business_name: string
  category?: string
  google_review_link?: string
  tone?: string
  slug: string
  qrDataUrl?: string
  reviewPageUrl?: string
}

type Props = {
  business?: Business
  onReset?: () => void
}

export default function QRResult({ business, onReset }: Props) {
  if (!business) return null

  const reviewUrl =
    business.reviewPageUrl ||
    `https://www.alphabasline.com/review/${business.slug}`

  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">QR Generated Successfully</h2>

      <p className="mb-2">
        <strong>Business:</strong> {business.business_name}
      </p>

      <p className="mb-4 break-all">
        <strong>Review Page:</strong> {reviewUrl}
      </p>

      {business.qrDataUrl ? (
        <img
          src={business.qrDataUrl}
          alt="QR Code"
          className="mb-4 w-[200px] h-[200px]"
        />
      ) : (
        <p>No QR available</p>
      )}

      {business.qrDataUrl && (
        <a
          href={business.qrDataUrl}
          download="qr-code.png"
          className="inline-block rounded-lg px-4 py-2 border mr-3"
        >
          Download QR
        </a>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="inline-block rounded-lg px-4 py-2 border"
        >
          Create Another
        </button>
      )}
    </div>
  )
}
