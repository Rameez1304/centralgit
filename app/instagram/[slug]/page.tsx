import { supabase } from '@/lib/supabase'

export default async function InstagramSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data, error } = await supabase
    .from('instagram_links')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Page not found
          </h1>
          <p>This QR code or page doesn't exist.</p>
        </div>
      </div>
    )
  }

  const comment = 'Loved this ❤️'

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          AI Suggested Comment
        </h1>

        <textarea
          readOnly
          value={comment}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={() => navigator.clipboard.writeText(comment)}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Copy
        </button>

        <a
          href={data.instagram_url}
          target="_blank"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Open Instagram
        </a>
      </div>
    </div>
  )
}
