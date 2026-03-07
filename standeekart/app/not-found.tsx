import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-7xl text-mist mb-4">404</p>
        <h1 className="font-display text-2xl text-ink mb-3">Page not found</h1>
        <p className="text-slate text-base mb-8 max-w-xs mx-auto">
          This QR code or page doesn't exist. It may have been deleted or the link is incorrect.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  )
}
