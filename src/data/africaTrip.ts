import type { Day } from './trip'

export const africaTrip = {
  name: 'African Safari',
  year: '2026',
  start: '2026-09-12',
  end: '2026-09-16',
  rangeLabel: '12 – 16 Sep',
  travelers: ['Kat', 'Jess'] as const,
  tagline:
    'Five days in Kenya — Nairobi, then game drives in the Maasai Mara.',
  heroImage:
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Safari landscape at golden hour',
  daysIntro:
    'Five days across Nairobi and the Maasai Mara. Here’s what’s locked in so far, plus a few flexible ideas.',
}

export const africaDays: Day[] = [
  {
    id: 'sep-12',
    date: '2026-09-12',
    weekday: 'Saturday',
    title: 'Arrive Nairobi',
    summary: 'Land in Nairobi, settle in, and ease into the trip.',
    activities: [
      {
        time: '1:20 PM',
        title: 'Arrive Nairobi',
        place: 'Jomo Kenyatta International Airport (NBO)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Jomo+Kenyatta+International+Airport',
        type: 'flight',
        notes: ['Meet the transfer · ~45 min to the city'],
      },
      {
        time: '3:00 PM',
        title: 'Check in',
        place: 'Nairobi hotel',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nairobi+hotel',
        type: 'stay',
        notes: ['Drop bags, shower, short rest before dinner'],
        links: [{ label: 'Stay details', href: '#', key: true }],
      },
      {
        time: '6:30 PM',
        title: 'Dinner in Westlands',
        place: 'Westlands · Nairobi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Westlands+Nairobi',
        type: 'food',
        notes: [
          'Easy first-night options near the hotel',
          'Keep it early — long travel day',
        ],
      },
    ],
  },
  {
    id: 'sep-13',
    date: '2026-09-13',
    weekday: 'Sunday',
    title: 'To the Mara',
    summary: 'Fly into the Maasai Mara and settle into camp before a sunset drive.',
    activities: [
      {
        time: '8:30 AM',
        title: 'Domestic flight to the Mara',
        place: 'Wilson Airport → Mara airstrip',
        maps: 'https://www.google.com/maps/search/?api=1&query=Wilson+Airport+Nairobi',
        type: 'flight',
        notes: [
          'Small aircraft · luggage limits apply',
          'Lodge transfer waits at the airstrip',
        ],
      },
      {
        time: '11:00 AM',
        title: 'Check in at lodge',
        place: 'Maasai Mara safari camp',
        maps: 'https://www.google.com/maps/search/?api=1&query=Maasai+Mara+National+Reserve',
        type: 'stay',
        notes: ['Welcome drink · tent briefing · lunch'],
        links: [{ label: 'Lodge details', href: '#', key: true }],
      },
      {
        time: '4:00 PM',
        title: 'Afternoon game drive',
        place: 'Maasai Mara National Reserve',
        maps: 'https://www.google.com/maps/search/?api=1&query=Maasai+Mara+National+Reserve',
        type: 'experience',
        notes: [
          'First look at the plains · golden light toward dusk',
          'Binoculars and a warm layer recommended',
        ],
      },
      {
        time: 'Evening',
        title: 'Campfire dinner',
        place: 'Safari lodge',
        type: 'food',
        notes: ['Stargazing if skies are clear'],
      },
    ],
  },
  {
    id: 'sep-14',
    date: '2026-09-14',
    weekday: 'Monday',
    title: 'Full day on safari',
    summary: 'Sunrise drive, midday rest, then back out for evening wildlife.',
    activities: [
      {
        time: '5:45 AM',
        title: 'Sunrise game drive',
        place: 'Maasai Mara National Reserve',
        maps: 'https://www.google.com/maps/search/?api=1&query=Maasai+Mara+National+Reserve',
        type: 'experience',
        notes: [
          'Coffee before departure',
          'Best chance for predators still active',
        ],
      },
      {
        time: 'Late morning',
        title: 'Brunch back at camp',
        place: 'Safari lodge',
        type: 'food',
        notes: ['Rest, shower, charge cameras'],
      },
      {
        time: '3:30 PM',
        title: 'Afternoon game drive',
        place: 'Maasai Mara National Reserve',
        type: 'experience',
        notes: [
          'River crossings and plains wildlife',
          'Ask the guide about migration timing',
        ],
      },
      {
        time: 'Evening',
        title: 'Sundowners on the plains',
        place: 'Scenic lookout · Mara',
        type: 'suggestion',
        notes: ['Guided stop with drinks before returning to camp'],
      },
    ],
  },
  {
    id: 'sep-15',
    date: '2026-09-15',
    weekday: 'Tuesday',
    title: 'Mara morning',
    summary: 'One last game drive, then fly back to Nairobi for the night.',
    activities: [
      {
        time: '6:00 AM',
        title: 'Final morning drive',
        place: 'Maasai Mara National Reserve',
        maps: 'https://www.google.com/maps/search/?api=1&query=Maasai+Mara+National+Reserve',
        type: 'experience',
        notes: ['Focus on any wildlife still on the wish list'],
      },
      {
        time: '10:30 AM',
        title: 'Check out & transfer',
        place: 'Lodge → Mara airstrip',
        type: 'booking',
        notes: ['Packed lunch if the flight is midday'],
      },
      {
        time: '12:30 PM',
        title: 'Fly back to Nairobi',
        place: 'Mara airstrip → Wilson Airport',
        type: 'flight',
        notes: ['Transfer to the city hotel'],
      },
      {
        time: '4:00 PM',
        title: 'Nairobi overnight',
        place: 'Nairobi hotel',
        type: 'stay',
        notes: ['Easy dinner nearby · pack for tomorrow’s flight'],
      },
    ],
  },
  {
    id: 'sep-16',
    date: '2026-09-16',
    weekday: 'Wednesday',
    title: 'Depart',
    summary: 'Optional short visit, then airport for the evening flight home.',
    activities: [
      {
        time: 'Morning',
        title: 'Giraffe Centre or city coffee',
        place: 'Nairobi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Giraffe+Centre+Nairobi',
        type: 'suggestion',
        notes: [
          'Flexible — skip if you want a slow morning',
          'Leave bags at the hotel if heading out',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Check out',
        place: 'Nairobi hotel',
        type: 'stay',
      },
      {
        time: '6:40 PM',
        title: 'Nairobi → home',
        place: 'Jomo Kenyatta International Airport (NBO)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Jomo+Kenyatta+International+Airport',
        type: 'flight',
        notes: ['Arrive ~3 hours before international departure'],
        links: [{ label: 'Flight itinerary', href: '#', key: true }],
      },
    ],
  },
]
