import type { Activity, Day, TripLink } from '../data/trip'

/** Legacy Japan demo key links — used once to seed `key` flags on activities */
export const japanLegacyKeyLinks: TripLink[] = [
  {
    label: 'Flight Itinerary',
    href: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
  },
  {
    label: 'Tokyo accommodation',
    href: 'https://drive.google.com/drive/folders/1c8aMCdnIIhdH_d_AGqAQDU-tL12qTQSY?usp=drive_link',
  },
  {
    label: 'Shibuya Sky tickets',
    href: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
  },
  {
    label: 'teamLab Borderless tickets',
    href: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
  },
  {
    label: 'Private Mt Fuji & Hakone tour',
    href: 'https://drive.google.com/drive/folders/1IPnKFy5tydO5V_Ib3UDQLCUGPWGopvyR?usp=drive_link',
  },
  {
    label: 'Hakone accommodation',
    href: 'https://drive.google.com/drive/folders/1kQaHNVfK0b99pizOgL59WprJm7W4CyeJ?usp=drive_link',
  },
  {
    label: 'Kyoto accommodation',
    href: 'https://drive.google.com/drive/folders/1K8RI5p9EKy_tkFTGLrWT9K28EaGprvNY?usp=drive_link',
  },
  {
    label: 'Kyoto ghost tour',
    href: 'https://drive.google.com/drive/folders/1IJG17in0tftnb79nvIt-y5KHgce0VJiu?usp=drive_link',
  },
  {
    label: 'Osaka accommodation',
    href: 'https://drive.google.com/drive/folders/1lLXQALDkWclZIcDAyqPr4yGV23LFm4lZ?usp=drive_link',
  },
  {
    label: 'Daruma painting experience',
    href: 'https://drive.google.com/drive/folders/1rlxskWuPg-PgZKyx54rMJl18X-xbnaRf',
  },
];

export function formatKeyLinkNote(day: Day): string {
  const date = new Date(day.date + 'T12:00:00')
  const formatted = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })
  return `${formatted} · ${day.weekday}`
}

/** Collect key links and attachments flagged on activities */
export function collectKeyLinks(days: Day[]): TripLink[] {
  const items: TripLink[] = []

  for (const day of days) {
    const note = formatKeyLinkNote(day)
    for (const activity of day.activities) {
      for (const link of activity.links ?? []) {
        if (link.key) {
          items.push({
            label: link.label,
            href: link.href,
            note,
          })
        }
      }
      for (const file of activity.files ?? []) {
        if (file.key) {
          items.push({
            label: file.name,
            href: file.url,
            note,
          })
        }
      }
    }
  }

  return items
}

/**
 * One-time migration from standalone key-link lists onto activity links/files.
 * Matches by href and applies legacy labels. Each href is keyed at most once.
 */
export function applyKeyLinkFlags(
  days: Day[],
  legacy: TripLink[],
): Day[] {
  const labelByHref = new Map(legacy.map((item) => [item.href, item.label]))
  const usedHrefs = new Set<string>()

  function claimKey(href: string) {
    if (!labelByHref.has(href) || usedHrefs.has(href)) return false
    usedHrefs.add(href)
    return true
  }

  return days.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => migrateActivity(activity, labelByHref, claimKey)),
  }))
}

function migrateActivity(
  activity: Activity,
  labelByHref: Map<string, string>,
  claimKey: (href: string) => boolean,
): Activity {
  const links = [...(activity.links ?? [])]

  if (activity.link) {
    const href = activity.link
    if (!links.some((link) => link.href === href)) {
      links.push({
        label: labelByHref.get(href) ?? 'Link',
        href,
        key: claimKey(href),
      })
    }
  }

  const nextLinks = links
    .map((link) => {
      const legacyLabel = labelByHref.get(link.href)
      const key = link.key || claimKey(link.href)
      return {
        ...link,
        key: key || undefined,
        label: legacyLabel ?? link.label,
      }
    })
    .filter((link) => link.label.trim() && link.href.trim())

  const files = activity.files?.map((file) => ({
    ...file,
    key: file.key || claimKey(file.url) || undefined,
  }))

  const { link: _legacy, ...rest } = activity
  return {
    ...rest,
    links: nextLinks.length ? nextLinks : undefined,
    files: files?.length ? files : undefined,
  }
}
