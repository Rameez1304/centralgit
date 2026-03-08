import React from 'react'

type Business = {
  id?: string
  business_name: string
  category?: string
  google_review_link?: string
  tone?: string
  slug: string
}

type CreateBusinessResponse = {
  business: Business
  qrCode?: string
}

type Props = {
  business?: Business
  result?: CreateBusinessResponse
  onReset?: () => void
}

export default function QRResult({ business, result, onReset }: Props) {
  const finalBusiness = business || result?.business

  if (!finalBusiness) return null

  const qrUrl = `https://www.standeekart.com/review/${finalBusiness.slug}`

  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">QR Generated Successfully</h2>

      <p className="mb-2">
        <strong>Business:</strong> {finalBusiness.business_name}
      </p>

      <p className="mb-4">
        <strong>Review Page:</strong>
      </p>

      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
        alt="QR Code"
        className="mb-4"
      />

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">Shareable Review Link</p>

        <div className="border rounded-lg p-3 bg-gray-50 break-all text-sm">
          {qrUrl}
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(qrUrl)}
          className="mt-3 w-full bg-black text-white py-2 rounded"
        >
          Copy Link
        </button>

        <a
          href={qrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-blue-600 underline"
        >
          Open Link
        </a>
      </div>

      <a
        href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}`}
        download
        className="inline-block rounded-lg px-4 py-2 border mr-3 mt-4"
      >
        Download QR
      </a>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-block rounded-lg px-4 py-2 border mt-4"
        >
          Create Another
        </button>
      )}
    </div>
  )
}
