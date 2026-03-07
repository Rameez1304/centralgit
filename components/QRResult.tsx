'use client'

import { useState } from 'react'
import type { CreateBusinessResponse } from '@/types'

interface Props {
  result: CreateBusinessResponse
  onReset: () => void
}

export default function QRResult({ result, onReset }: Props) {
  const { business, qrDataUrl } = result
  const [copied, setCopied] = useState(false)
  const reviewUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/review/${business.slug}`

  function downloadQR(format: 'png' | 'svg') {
    if (format === 'png') {
      const link = document.createElement('a')
      link.download = `${business.slug}-qr.png`
      link.href = qrDataUrl
      link.click()
    } else {
      // Convert data URL to SVG string
      const img = new Image()
      img.src = qrDataUrl
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 400
        canvas.height = 400
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <image href="${qrDataUrl}" width="400" height="400"/>
</svg>`
        const blob = new Blob([svgContent], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `${business.slug}-qr.svg`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(reviewUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="animate-fade-in">
      {/* Success banner */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#059669] rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#065F46]">QR Code created successfully!</p>
          <p className="text-xs text-[#047857]">{business.business_name} is ready to collect reviews</p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 shadow-lg shadow-black/4">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* QR Code */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E8E8] shadow-sm">
              <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 block" />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => downloadQR('png')}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#F9F9F9] hover:bg-[#F0F0F0] border border-[#E8E8E8] text-[#444] text-xs font-medium py-2.5 rounded-xl transition-colors"
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path d="M6 1V8M3 6L6 9L9 6M2 11H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                PNG
              </button>
              <button
                onClick={() => downloadQR('svg')}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#F9F9F9] hover:bg-[#F0F0F0] border border-[#E8E8E8] text-[#444] text-xs font-medium py-2.5 rounded-xl transition-colors"
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path d="M6 1V8M3 6L6 9L9 6M2 11H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                SVG
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-[#0D0D0D]" style={{fontFamily: 'Playfair Display, serif'}}>{business.business_name}</h3>
            </div>
            <p className="text-sm text-[#888] mb-5">{business.category}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#EEF3FF] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M1 5L4 8L9 2" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm text-[#444]">QR saved and ready to use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#EEF3FF] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M1 5L4 8L9 2" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm text-[#444]">AI review generation enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#EEF3FF] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M1 5L4 8L9 2" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm text-[#444]">Tone: <span className="font-medium capitalize">{business.tone}</span></span>
              </div>
            </div>

            {/* Review page link */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-2">Customer Review Page</p>
              <div className="flex items-center gap-2 bg-[#F9F9F9] border border-[#E8E8E8] rounded-xl px-3 py-2.5">
                <p className="text-xs text-[#666] truncate flex-1">{reviewUrl}</p>
                <button
                  onClick={copyLink}
                  className="flex-shrink-0 text-xs font-medium text-[#1A56DB] hover:text-[#1648C0] transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <a
                href={`/review/${business.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1A56DB] text-white text-sm font-semibold py-3 rounded-xl text-center hover:bg-[#1648C0] transition-colors"
              >
                Preview page
              </a>
              <button
                onClick={onReset}
                className="flex-1 bg-[#F9F9F9] text-[#444] text-sm font-semibold py-3 rounded-xl hover:bg-[#F0F0F0] border border-[#E8E8E8] transition-colors"
              >
                Create another
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4">
        <p className="text-sm text-[#92400E]">
          <span className="font-semibold">💡 Pro tip:</span> Print this QR code and place it at your checkout counter, on tables, receipts, or packaging for maximum scans.
        </p>
      </div>
    </div>
  )
}
