import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#E8E8E8]">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0D0D0D] mb-3" style={{fontFamily: 'Playfair Display, serif'}}>
          Page not found
        </h1>
        <p className="text-sm text-[#888] mb-8">
          This review page doesn't exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0D0D0D] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#333] transition-colors"
        >
          Create a new QR code
        </Link>
      </div>
    </div>
  )
}
