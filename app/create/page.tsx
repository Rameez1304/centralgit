async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  const err = validate()
  if (err) {
    setError(err)
    return
  }

  setLoading(true)
  setError(null)

  try {
    const res = await fetch('/api/generate-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.error || 'Failed to generate QR')
    }

    setBusiness({
      ...result.business,
      qrDataUrl: result.qrDataUrl,
      reviewPageUrl: result.reviewPageUrl,
    })

    setStep('qr')
  } catch (err: any) {
    setError(err.message ?? 'Something went wrong')
  } finally {
    setLoading(false)
  }
}
