import type { Day } from './trip'

export const hawaiiTrip = {
  name: 'Hawaii',
  year: '2026',
  start: '2026-03-14',
  end: '2026-03-18',
  rangeLabel: '14 – 18 Mar',
  travelers: ['Kat', 'Jess'] as const,
  tagline: 'Four days on Oahu — beaches, poke, and one slow morning before flying home.',
  heroImage:
    'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Green coastline with mountains and reef in Hawaii',
  groupPhoto:
    'https://images.unsplash.com/photo-1758275557315-2685e63fa8d2?auto=format&fit=crop&w=640&h=640&fit=crop&q=80',
  groupPhotoAlt: 'Kat and Jess taking a selfie outdoors',
  daysIntro:
    'Four days on Oahu. Flights and the Waikiki stay are booked — the rest is easy to fill in as you go.',
}

export const hawaiiDays: Day[] = [
  {
    id: 'mar-14',
    date: '2026-03-14',
    weekday: 'Saturday',
    title: 'Land in Honolulu',
    summary: 'Touch down, check in near Waikiki, and find an easy first dinner.',
    activities: [
      {
        time: '11:45 AM',
        title: 'Arrive Honolulu',
        place: 'Daniel K. Inouye International Airport (HNL)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Daniel+K+Inouye+International+Airport',
        type: 'flight',
        notes: ['Grab bags · rideshare or hotel shuttle to Waikiki'],
      },
      {
        time: '1:30 PM',
        title: 'Check in',
        place: 'Waikiki hotel',
        maps: 'https://www.google.com/maps/search/?api=1&query=Waikiki+Honolulu',
        type: 'stay',
        notes: ['Drop bags · change · short rest'],
        links: [{ label: 'Stay details', href: '#', key: true }],
      },
      {
        time: '5:00 PM',
        title: 'Sunset walk & poke',
        place: 'Waikiki Beach',
        maps: 'https://www.google.com/maps/search/?api=1&query=Waikiki+Beach',
        type: 'food',
        notes: ['Easy stroll along the shore · casual dinner nearby'],
      },
    ],
  },
  {
    id: 'mar-15',
    date: '2026-03-15',
    weekday: 'Sunday',
    title: 'Beach day',
    summary: 'Slow morning, then swim, sun, and shave ice in Waikiki.',
    activities: [
      {
        time: 'Morning',
        title: 'Coffee & beach time',
        place: 'Waikiki',
        maps: 'https://www.google.com/maps/search/?api=1&query=Waikiki+Beach',
        type: 'experience',
        notes: ['Rent chairs if you want them · reef-safe sunscreen'],
      },
      {
        time: '1:00 PM',
        title: 'Lunch on Kalakaua',
        place: 'Kalakaua Avenue · Waikiki',
        type: 'food',
        notes: ['Plenty of casual spots — no reservation needed'],
      },
      {
        time: 'Afternoon',
        title: 'Diamond Head lookout',
        place: 'Diamond Head State Monument',
        maps: 'https://www.google.com/maps/search/?api=1&query=Diamond+Head+State+Monument',
        type: 'sight',
        notes: [
          'Book timed entry if hiking the trail',
          'Skip the hike and drive the lookout if you prefer',
        ],
      },
    ],
  },
  {
    id: 'mar-16',
    date: '2026-03-16',
    weekday: 'Monday',
    title: 'North Shore run',
    summary: 'Rent a car or join a tour — Haleiwa, shrimp trucks, and big-wave beaches.',
    activities: [
      {
        time: '8:30 AM',
        title: 'Drive to the North Shore',
        place: 'Haleiwa · Oahu',
        maps: 'https://www.google.com/maps/search/?api=1&query=Haleiwa+Hawaii',
        type: 'experience',
        notes: ['Leave early to beat traffic · stop for malasadas in Haleiwa'],
      },
      {
        time: '12:30 PM',
        title: 'Lunch at a shrimp truck',
        place: 'Kahuku · North Shore',
        type: 'food',
        notes: ['Giovanni’s or Romy’s — both classics'],
      },
      {
        time: '3:00 PM',
        title: 'Sunset Beach & Pipeline',
        place: 'Banzai Pipeline · Ehukai Beach Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Banzai+Pipeline+Hawaii',
        type: 'sight',
        notes: ['Watch from the sand — strong currents, swim elsewhere'],
      },
    ],
  },
  {
    id: 'mar-17',
    date: '2026-03-17',
    weekday: 'Tuesday',
    title: 'Last full day',
    summary: 'Pack in one more swim, pick up souvenirs, and pack for an early start.',
    activities: [
      {
        time: 'Morning',
        title: 'Final swim & coffee',
        place: 'Waikiki Beach',
        type: 'experience',
        notes: ['Check out late if the hotel allows it'],
      },
      {
        time: '11:00 AM',
        title: 'Ala Moana run',
        place: 'Ala Moana Center · Honolulu',
        maps: 'https://www.google.com/maps/search/?api=1&query=Ala+Moana+Center',
        type: 'suggestion',
        notes: ['Souvenirs, snacks for the flight, anything you forgot'],
      },
      {
        time: '6:00 PM',
        title: 'Farewell dinner',
        place: 'Waikiki',
        type: 'food',
        notes: ['Book something nice — early night before tomorrow’s flight'],
      },
    ],
  },
  {
    id: 'mar-18',
    date: '2026-03-18',
    weekday: 'Wednesday',
    title: 'Fly home',
    summary: 'Early checkout and back to the airport.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Check out',
        place: 'Waikiki hotel',
        type: 'stay',
      },
      {
        time: '9:15 AM',
        title: 'Honolulu → home',
        place: 'Daniel K. Inouye International Airport (HNL)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Daniel+K+Inouye+International+Airport',
        type: 'flight',
        notes: ['Arrive ~2.5 hours before departure for domestic connections'],
        links: [{ label: 'Flight itinerary', href: '#', key: true }],
      },
    ],
  },
]
