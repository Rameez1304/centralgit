'use client'

import React, { useEffect, useState } from 'react'

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
  const [posterUrl, setPosterUrl] = useState('')

  if (!finalBusiness) return null

  const qrUrl = `https://www.standeekart.com/review/${finalBusiness.slug}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}`

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = 800
    canvas.height = 1200

    const bg = new Image()
    const qr = new Image()

    bg.crossOrigin = 'anonymous'
    qr.crossOrigin = 'anonymous'

    bg.src = '/templates/google-review-template.png'

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

      qr.src = qrImage

      qr.onload = () => {
        ctx.font = 'bold 28px serif'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'

        // business name
        ctx.fillText(
          finalBusiness.business_name.toUpperCase(),
          400,
          430
        )

        // QR centered
        ctx.drawImage(qr, 210, 460, 380, 380)
     
        const finalImage = canvas.toDataURL('image/png')
        setPosterUrl(finalImage)
      }

      qr.onerror = () => {
        console.error('QR image failed to load')
      }
    }

    bg.onerror = () => {
      console.error('Background image failed to load')
    }
  }, [finalBusiness.business_name, finalBusiness.slug, qrImage])

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
        src={qrImage}
        alt="QR Code"
        className="mb-4"
      />

      {posterUrl && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Poster Preview</p>

          <img
            src={posterUrl}
            alt="QR Poster"
            className="rounded-lg border"
          />

          <a
            href={posterUrl}
            download={`${finalBusiness.slug}-poster.png`}
            className="block mt-3 w-full bg-black text-white py-2 rounded text-center"
          >
            Download Poster
          </a>
        </div>
      )}

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
        href={qrImage}
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
