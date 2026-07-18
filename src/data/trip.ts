export type Activity = {
  time?: string
  place: string
  detail?: string
}

export type Day = {
  id: string
  date: string
  weekday: string
  title: string
  summary: string
  activities: Activity[]
}

export const trip = {
  name: 'Japan',
  year: '2026',
  start: '2026-07-21',
  end: '2026-07-31',
  rangeLabel: '21 – 31 July',
  tagline: 'Our shared plan for ten days on the ground.',
  heroImage:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Traditional street in Kyoto at dusk',
}

export const days: Day[] = [
  {
    id: 'jul-21',
    date: '2026-07-21',
    weekday: 'Tuesday',
    title: 'Arrival',
    summary: 'Landing day — details to follow.',
    activities: [],
  },
  {
    id: 'jul-22',
    date: '2026-07-22',
    weekday: 'Wednesday',
    title: 'Day 2',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-23',
    date: '2026-07-23',
    weekday: 'Thursday',
    title: 'Day 3',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-24',
    date: '2026-07-24',
    weekday: 'Friday',
    title: 'Day 4',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-25',
    date: '2026-07-25',
    weekday: 'Saturday',
    title: 'Day 5',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-26',
    date: '2026-07-26',
    weekday: 'Sunday',
    title: 'Day 6',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-27',
    date: '2026-07-27',
    weekday: 'Monday',
    title: 'Day 7',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-28',
    date: '2026-07-28',
    weekday: 'Tuesday',
    title: 'Day 8',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-29',
    date: '2026-07-29',
    weekday: 'Wednesday',
    title: 'Day 9',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-30',
    date: '2026-07-30',
    weekday: 'Thursday',
    title: 'Day 10',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-31',
    date: '2026-07-31',
    weekday: 'Friday',
    title: 'Departure',
    summary: 'Heading home — details to follow.',
    activities: [],
  },
]
