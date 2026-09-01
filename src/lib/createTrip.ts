import type { Day, TripLink } from '../data/trip'

export type SessionTrip = {
  name: string
  year: string
  start: string
  end: string
  rangeLabel: string
  travelers: string[]
  tagline: string
  heroImage: string
  heroAlt: string
  /** Layout treatment for the trip hero */
  heroStyle?: HeroStyle
  /** Accent colour palette for the trip view */
  colorScheme?: ColorScheme
  groupPhoto?: string
  groupPhotoAlt?: string
  /** Who can open the trip · default private */
  privacy?: TripPrivacy
  /** Include key links and file attachments on the shared view · default true */
  shareLinksAndAttachments?: boolean
  /** Sample / seeded itinerary shown in the library */
  isDemo?: boolean
  /** View-mode intro under the days heading (demos) */
  daysIntro?: string
}

export type TripPrivacy = 'private' | 'link'

export const TRIP_PRIVACY: Record<
  TripPrivacy,
  { label: string; blurb: string }
> = {
  private: {
    label: 'Private',
    blurb: 'Only you can open this trip',
  },
  link: {
    label: 'Anyone with the link',
    blurb: 'View-only · you’re still the only editor',
  },
}

export type ColorScheme =
  | 'terracotta'
  | 'ocean'
  | 'sakura'
  | 'forest'
  | 'indigo'

export const COLOR_SCHEMES: {
  id: ColorScheme
  label: string
  accent: string
  accentDeep: string
}[] = [
  {
    id: 'terracotta',
    label: 'Terracotta',
    accent: '#b5451b',
    accentDeep: '#8f3412',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    accent: '#1a6b8a',
    accentDeep: '#124d63',
  },
  {
    id: 'sakura',
    label: 'Sakura',
    accent: '#c44d7a',
    accentDeep: '#9a3a60',
  },
  {
    id: 'forest',
    label: 'Forest',
    accent: '#2d6a4f',
    accentDeep: '#1b4332',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    accent: '#4a4e9c',
    accentDeep: '#363878',
  },
]

export function colorSchemeStyle(
  scheme: ColorScheme | undefined,
): Record<string, string> {
  const match =
    COLOR_SCHEMES.find((item) => item.id === scheme) ?? COLOR_SCHEMES[0]
  return {
    '--accent': match.accent,
    '--accent-deep': match.accentDeep,
  }
}

export type HeroStyle = 'full' | 'compact' | 'poster' | 'banner' | 'minimal'

export const HERO_STYLES: {
  id: HeroStyle
  label: string
  blurb: string
}[] = [
  {
    id: 'full',
    label: 'Full bleed',
    blurb: 'Edge-to-edge photo — current look',
  },
  {
    id: 'compact',
    label: 'Compact',
    blurb: 'Shorter hero, faster to the days',
  },
  {
    id: 'poster',
    label: 'Poster',
    blurb: 'Centered title over a deeper veil',
  },
  {
    id: 'banner',
    label: 'Banner',
    blurb: 'Photo strip on top, text on paper',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    blurb: 'Typography first, soft atmosphere',
  },
]

export type TripRecord = {
  id: string
  trip: SessionTrip
  days: Day[]
  links: TripLink[]
}

let tripIdCounter = 0

export function nextTripId(prefix = 'trip') {
  tripIdCounter += 1
  return `${prefix}-${tripIdCounter}`
}

export type CreateTripInput = {
  name: string
  /** ISO dates when using a range */
  start?: string
  end?: string
  /** Used when dates are not set */
  dayCount?: number
  travelers?: string[]
}

export const DEFAULT_HERO =
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80'

function parseLocalDate(iso: string) {
  return new Date(iso + 'T12:00:00')
}

function toIso(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(iso: string, offset: number) {
  const date = parseLocalDate(iso)
  date.setDate(date.getDate() + offset)
  return toIso(date)
}

export function weekdayLabel(iso: string) {
  return parseLocalDate(iso).toLocaleDateString('en-GB', { weekday: 'long' })
}

export function formatRangeLabel(start: string, end: string) {
  const startDate = parseLocalDate(start)
  const endDate = parseLocalDate(end)
  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()

  const dayStart = startDate.getDate()
  const dayEnd = endDate.getDate()
  const monthEnd = endDate.toLocaleDateString('en-GB', { month: 'short' })

  if (sameMonth) {
    return `${dayStart} – ${dayEnd} ${monthEnd}`
  }

  const monthStart = startDate.toLocaleDateString('en-GB', { month: 'short' })
  return `${dayStart} ${monthStart} – ${dayEnd} ${monthEnd}`
}

function daysBetween(start: string, end: string) {
  const ms =
    parseLocalDate(end).getTime() - parseLocalDate(start).getTime()
  return Math.floor(ms / 86_400_000) + 1
}

function buildDay(index: number, date: string): Day {
  const n = index + 1
  return {
    id: `day-${n}-${date}`,
    date,
    weekday: weekdayLabel(date),
    title: `Day ${n}`,
    summary: 'Nothing planned yet.',
    activities: [],
  }
}

export function createTripFromInput(input: CreateTripInput): TripRecord {
  const name = input.name.trim() || 'Trip'
  const travelers = (input.travelers ?? [])
    .map((t) => t.trim())
    .filter(Boolean)

  let start: string
  let end: string
  let count: number

  if (input.start && input.end) {
    start = input.start
    end = input.end
    count = Math.max(1, daysBetween(start, end))
  } else {
    count = Math.max(1, Math.min(60, input.dayCount ?? 7))
    start = toIso(new Date())
    end = addDays(start, count - 1)
  }

  const days: Day[] = Array.from({ length: count }, (_, index) =>
    buildDay(index, addDays(start, index)),
  )

  const year = String(parseLocalDate(start).getFullYear())
  const rangeLabel = formatRangeLabel(start, end)
  const who =
    travelers.length > 0
      ? ` with ${travelers.join(', ').replace(/, ([^,]*)$/, ' & $1')}`
      : ''

  const trip: SessionTrip = {
    name,
    year,
    start,
    end,
    rangeLabel,
    travelers,
    tagline: `${count} day${count === 1 ? '' : 's'}${who} — add plans whenever you're ready.`,
    heroImage: DEFAULT_HERO,
    heroAlt: 'Travel destination',
    heroStyle: 'full',
    colorScheme: 'terracotta',
    privacy: 'private',
  }

  return { id: nextTripId(), trip, days, links: [] }
}
