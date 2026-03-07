export function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
    '-' +
    Date.now()
  )
}

export function generateUniqueSlug(name: string): string {
  return generateSlug(name)
}

export function toneLabel(tone: string): string {
  switch (tone) {
    case 'friendly':
      return 'Friendly'
    case 'professional':
      return 'Professional'
    case 'short':
      return 'Short'
    default:
      return tone
  }
}
