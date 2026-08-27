export type UnsplashPhoto = {
  id: string
  url: string
  thumb: string
  alt: string
  photographer: string
  photographerUrl?: string
}

/** Curated free Unsplash covers used when no API key is set */
const LOCAL_CATALOG: (UnsplashPhoto & { keywords: string[] })[] = [
  {
    id: 'kyoto',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=60',
    alt: 'Traditional street in Kyoto at dusk',
    photographer: 'Su San Lee',
    keywords: ['japan', 'kyoto', 'asia', 'street', 'temple', 'travel'],
  },
  {
    id: 'coast',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=60',
    alt: 'Tropical beach coastline',
    photographer: 'Sean Oulashin',
    keywords: ['beach', 'coast', 'ocean', 'summer', 'tropical', 'sea'],
  },
  {
    id: 'mountains',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=60',
    alt: 'Mountain peaks above the clouds',
    photographer: 'Kalen Emsley',
    keywords: ['mountain', 'alps', 'hiking', 'nature', 'peak', 'snow'],
  },
  {
    id: 'city',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=60',
    alt: 'City lights at night',
    photographer: 'Pedro Lastra',
    keywords: ['city', 'night', 'skyline', 'urban', 'lights', 'new york'],
  },
  {
    id: 'tokyo',
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=60',
    alt: 'Tokyo cityscape at dusk',
    photographer: 'Jezael Melgoza',
    keywords: ['japan', 'tokyo', 'city', 'asia', 'skyline', 'travel'],
  },
  {
    id: 'italy',
    url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=60',
    alt: 'Colorful cliffside town in Italy',
    photographer: 'Jack Ward',
    keywords: ['italy', 'europe', 'coast', 'cinque terre', 'travel', 'village'],
  },
  {
    id: 'desert',
    url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=400&q=60',
    alt: 'Sand dunes in warm light',
    photographer: 'Neom',
    keywords: ['desert', 'dunes', 'sand', 'morocco', 'warm', 'travel'],
  },
  {
    id: 'forest',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=60',
    alt: 'Sunlight through a green forest',
    photographer: 'John Fowler',
    keywords: ['forest', 'trees', 'nature', 'green', 'woods', 'hike'],
  },
  {
    id: 'paris',
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=60',
    alt: 'Eiffel Tower over Paris rooftops',
    photographer: 'Chris Karidis',
    keywords: ['paris', 'france', 'europe', 'city', 'eiffel', 'travel'],
  },
  {
    id: 'bali',
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=60',
    alt: 'Temple and tropical landscape in Bali',
    photographer: 'Oliver Sjöström',
    keywords: ['bali', 'indonesia', 'temple', 'tropical', 'asia', 'travel'],
  },
  {
    id: 'lake',
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=60',
    alt: 'Calm mountain lake at sunrise',
    photographer: 'Luca Bravo',
    keywords: ['lake', 'water', 'mountains', 'sunrise', 'nature', 'calm'],
  },
  {
    id: 'nyc',
    url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=60',
    alt: 'Busy New York street',
    photographer: 'Luca Bravo',
    keywords: ['new york', 'nyc', 'usa', 'city', 'street', 'urban'],
  },
]

export function hasUnsplashKey() {
  return Boolean(import.meta.env.VITE_UNSPLASH_ACCESS_KEY)
}

function searchLocal(query: string): UnsplashPhoto[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)

  if (!terms.length) {
    return LOCAL_CATALOG.map(({ keywords: _k, ...photo }) => photo)
  }

  return LOCAL_CATALOG.filter((photo) => {
    const haystack = [
      photo.alt,
      photo.photographer,
      ...photo.keywords,
    ]
      .join(' ')
      .toLowerCase()
    return terms.every((term) => haystack.includes(term))
  }).map(({ keywords: _k, ...photo }) => photo)
}

type UnsplashApiResult = {
  results: Array<{
    id: string
    alt_description: string | null
    description: string | null
    urls: { regular: string; small: string }
    user: { name: string; links: { html: string } }
  }>
}

export async function searchUnsplash(
  query: string,
  signal?: AbortSignal,
): Promise<{ photos: UnsplashPhoto[]; source: 'api' | 'local' }> {
  const q = query.trim()
  const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined

  if (!key) {
    return { photos: searchLocal(q || 'travel'), source: 'local' }
  }

  if (!q) {
    return { photos: [], source: 'api' }
  }

  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', q)
  url.searchParams.set('per_page', '12')
  url.searchParams.set('orientation', 'landscape')

  const res = await fetch(url, {
    signal,
    headers: { Authorization: `Client-ID ${key}` },
  })

  if (!res.ok) {
    throw new Error(`Unsplash search failed (${res.status})`)
  }

  const data = (await res.json()) as UnsplashApiResult
  const photos = data.results.map((photo) => ({
    id: photo.id,
    url: `${photo.urls.regular}&w=2400`,
    thumb: photo.urls.small,
    alt: photo.alt_description || photo.description || q,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
  }))

  return { photos, source: 'api' }
}
