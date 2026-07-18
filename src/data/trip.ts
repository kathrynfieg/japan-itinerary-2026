import groupPhoto from '../assets/group-photo.jpg'

export type Activity = {
  /** e.g. "10:00" or "Morning" */
  time?: string
  /** What you're doing — the only required field */
  title: string
  /** Neighbourhood, station, or venue name if useful */
  place?: string
  /** Extra bits — seats, inclusions, tips, etc. */
  notes?: string[]
  /** One URL — Maps, booking, menu, etc. */
  link?: string
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
  travelers: ['Zac', 'Jess', 'Kat'] as const,
  tagline: 'Zac, Jess & Kat — first time in Japan, and plenty to celebrate.',
  heroImage:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Traditional street in Kyoto at dusk',
  groupPhoto,
  groupPhotoAlt: 'Zac, Jess, and Kat',
}

export const days: Day[] = [
  {
    id: 'jul-21',
    date: '2026-07-21',
    weekday: 'Tuesday',
    title: 'Outbound',
    summary: 'Adelaide → Kuala Lumpur → Osaka. Overnight to Kansai.',
    activities: [
      {
        time: '9:50 AM',
        title: 'Adelaide → Kuala Lumpur',
        place: 'Malaysia Airlines MH138',
        notes: [
          'Arrives 4:00 PM',
          'Seats Kat 5K, Zac 5H, Jess 5G',
          'Ref DURC5W',
        ],
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Osaka',
        place: 'Malaysia Airlines MH52',
        notes: [
          'Arrives 5:45 AM next day',
          'Seats Kat 5H, Zac 5G, Jess 5K',
        ],
      },
    ],
  },
  {
    id: 'jul-22',
    date: '2026-07-22',
    weekday: 'Wednesday',
    title: 'Day 1',
    summary:
      'Land at Kansai, Shinkansen up to Tokyo, then settle near Shin-Ōkubo.',
    activities: [
      {
        time: '5:45 AM',
        title: 'Arrive Osaka (KIX)',
        place: 'Kansai International · Terminal 1',
        notes: ['MH52 from Kuala Lumpur'],
      },
      {
        time: '6:00 AM',
        title: 'Immigration & luggage',
        place: 'KIX',
        notes: ['Allow about an hour after landing'],
      },
      {
        time: '7:30 AM',
        title: 'HARUKA to Shin-Osaka',
        place: 'KIX → Shin-Osaka',
        notes: ['Limited express · about 50 min'],
      },
      {
        time: '9:00 AM',
        title: 'Nozomi to Tokyo',
        place: 'Shin-Osaka → Tokyo Station',
        notes: ['Shinkansen · about 2 hr 30 min'],
      },
      {
        time: '12:00 PM',
        title: 'To the accommodation',
        place: 'Ōkubo / Shin-Ōkubo',
        notes: ['From Tokyo Station · about 20 min by train'],
      },
      {
        time: '4:50 PM',
        title: 'Shibuya Sky Roof Bar Entry',
        place: 'Shibuya Sky',
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: '5:40 PM',
        title: 'Shibuya Sky Sunset Access',
        place: 'Shibuya Sky',
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
    ],
  },
  {
    id: 'jul-23',
    date: '2026-07-23',
    weekday: 'Thursday',
    title: 'Day 2',
    summary: 'Afternoon at Borderless, Azabudai Hills.',
    activities: [
      {
        time: '1:30 PM',
        title: 'teamLab Borderless',
        place: 'Azabudai Hills',
        notes: ['Includes free gelato at En Tea Teahouse'],
        link: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
      },
    ],
  },
  {
    id: 'jul-24',
    date: '2026-07-24',
    weekday: 'Friday',
    title: 'Day 3',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-25',
    date: '2026-07-25',
    weekday: 'Saturday',
    title: 'Day 4',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-26',
    date: '2026-07-26',
    weekday: 'Sunday',
    title: 'Day 5',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-27',
    date: '2026-07-27',
    weekday: 'Monday',
    title: 'Day 6',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-28',
    date: '2026-07-28',
    weekday: 'Tuesday',
    title: 'Day 7',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-29',
    date: '2026-07-29',
    weekday: 'Wednesday',
    title: 'Day 8',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-30',
    date: '2026-07-30',
    weekday: 'Thursday',
    title: 'Day 9',
    summary: 'Open — add plans when ready.',
    activities: [],
  },
  {
    id: 'jul-31',
    date: '2026-07-31',
    weekday: 'Friday',
    title: 'Homeward',
    summary: 'Osaka → Kuala Lumpur → Adelaide. Arrive Saturday morning.',
    activities: [
      {
        time: '9:55 AM',
        title: 'Osaka → Kuala Lumpur',
        place: 'Malaysia Airlines MH53',
        notes: [
          'Arrives 3:45 PM',
          'Seats Kat 5H, Zac 5K, Jess 6K',
          'Ref DURC5W',
        ],
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Adelaide',
        place: 'Malaysia Airlines MH139',
        notes: [
          'Arrives 7:00 AM Sat 1 Aug',
          'Seats Kat 7K, Zac 6K, Jess 7H',
        ],
      },
    ],
  },
]
