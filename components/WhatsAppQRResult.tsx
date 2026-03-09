'use client'

import React, { useEffect, useState } from 'react'

type Props = {
  phone: string
  name: string
}

export default function WhatsAppQRResult({ phone, name }: Props) {
  const [posterUrl, setPosterUrl] = useState('')

  const qrUrl = `https://wa.me/${phone}`
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

    bg.src = '/templates/whatsapp-template.png'

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

      qr.src = qrImage

      qr.onload = () => {
        ctx.textAlign = 'center'
        ctx.fillStyle = 'black'
        ctx.font = 'bold 34px Arial'

        ctx.fillText(name, 400, 300)

        ctx.drawImage(qr, 220, 380, 360, 360)

        const finalImage = canvas.toDataURL('image/png')
        setPosterUrl(finalImage)
      }
    }
  }, [phone, name, qrImage])

  return (
    <div className="mt-6">
      {posterUrl && (
        <>
          <img src={posterUrl} alt="WhatsApp Poster" className="rounded-lg border" />

          <a
            href={posterUrl}
            download={`${phone}-whatsapp.png`}
            className="block mt-3 w-full bg-black text-white py-2 rounded text-center"
          >
            Download Poster
          </a>
        </>
      )}
    </div>
  )
}
