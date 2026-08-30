import type { Day, TripLink } from './trip'

export const africaTrip = {
  name: 'Cape Town',
  year: '2026',
  start: '2026-09-12',
  end: '2026-09-16',
  rangeLabel: '12 – 16 Sep',
  travelers: ['Kat', 'Jess'] as const,
  tagline:
    'Five days in Cape Town — mountain, coast, and a day in the winelands.',
  heroImage:
    'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Table Mountain overlooking Cape Town harbour',
  daysIntro:
    'Five days around Cape Town. Here’s what’s locked in so far, plus a few flexible ideas.',
}

export const africaKeyLinks: TripLink[] = [
  {
    label: 'Flights',
    href: '#',
    note: '12 & 16 Sep · mock booking',
  },
  {
    label: 'City Bowl stay',
    href: '#',
    note: '12–16 Sep · Gardens / Tamboerskloof',
  },
  {
    label: 'Table Mountain tickets',
    href: '#',
    note: '13 Sep · cableway',
  },
]

export const africaDays: Day[] = [
  {
    id: 'sep-12',
    date: '2026-09-12',
    weekday: 'Saturday',
    title: 'Arrive Cape Town',
    summary: 'Land mid-afternoon, settle in, and ease into the city bowl.',
    activities: [
      {
        time: '2:40 PM',
        title: 'Arrive Cape Town',
        place: 'Cape Town International Airport (CPT)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Cape+Town+International+Airport',
        type: 'flight',
        notes: ['Collect bags, Uber or rental to the city (~30–40 min)'],
      },
      {
        time: '4:00 PM',
        title: 'Check in',
        place: 'Gardens / Tamboerskloof',
        maps: 'https://www.google.com/maps/search/?api=1&query=Tamboerskloof+Cape+Town',
        type: 'stay',
        notes: ['Drop bags, shower, short rest before dinner'],
        links: [{ label: 'Stay details', href: '#' }],
      },
      {
        time: '7:00 PM',
        title: 'Dinner in Kloof Street',
        place: 'Kloof Street · City Bowl',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kloof+Street+Cape+Town',
        type: 'food',
        notes: [
          'Easy first-night options along Kloof / Long Street',
          'Keep it early — still jet-lagged',
        ],
      },
    ],
  },
  {
    id: 'sep-13',
    date: '2026-09-13',
    weekday: 'Sunday',
    title: 'Table Mountain & city',
    summary: 'Cableway up Table Mountain, then Bo-Kaap and the Waterfront.',
    activities: [
      {
        time: '8:30 AM',
        title: 'Table Mountain cableway',
        place: 'Lower Cable Station',
        maps: 'https://www.google.com/maps/search/?api=1&query=Table+Mountain+Aerial+Cableway',
        type: 'sight',
        notes: [
          'Book a morning slot — weather can close the cableway',
          'Allow 2–3 hours on top for views and short walks',
        ],
        links: [{ label: 'Tickets', href: '#' }],
      },
      {
        time: '1:00 PM',
        title: 'Lunch near Bo-Kaap',
        place: 'Bo-Kaap',
        maps: 'https://www.google.com/maps/search/?api=1&query=Bo-Kaap+Cape+Town',
        type: 'food',
        notes: ['Cape Malay flavours · walk the colourful streets after'],
      },
      {
        time: '3:30 PM',
        title: 'V&A Waterfront stroll',
        place: 'Victoria & Alfred Waterfront',
        maps: 'https://www.google.com/maps/search/?api=1&query=VA+Waterfront+Cape+Town',
        type: 'sight',
        notes: ['Optional harbour cruise or just coffee by the water'],
      },
      {
        time: 'Evening',
        title: 'Sunset from Signal Hill',
        place: 'Signal Hill',
        maps: 'https://www.google.com/maps/search/?api=1&query=Signal+Hill+Cape+Town',
        type: 'suggestion',
        notes: ['Drive or Uber · bring a jacket'],
      },
    ],
  },
  {
    id: 'sep-14',
    date: '2026-09-14',
    weekday: 'Monday',
    title: 'Cape Peninsula',
    summary: 'Chapman’s Peak, penguins at Boulders, and the Cape Point drive.',
    activities: [
      {
        time: '8:00 AM',
        title: 'Peninsula day drive',
        place: 'Pick up car or join a tour',
        type: 'booking',
        notes: [
          'Full-day loop · leave early to beat traffic',
          'Chapman’s Peak Drive → Hout Bay → Cape Point → Boulders',
        ],
      },
      {
        time: '11:00 AM',
        title: 'Cape Point & Cape of Good Hope',
        place: 'Table Mountain National Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Cape+of+Good+Hope',
        type: 'sight',
        notes: ['Park entry fee · funicular optional'],
      },
      {
        time: '2:00 PM',
        title: 'Boulders Beach penguins',
        place: 'Simon’s Town',
        maps: 'https://www.google.com/maps/search/?api=1&query=Boulders+Beach+penguins',
        type: 'experience',
        notes: ['Boardwalk viewing · swim only if the water’s calm'],
      },
      {
        time: 'Evening',
        title: 'Seafood in Kalk Bay',
        place: 'Kalk Bay Harbour',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kalk+Bay+Harbour',
        type: 'food',
        notes: ['Flexible — head back to the city if tired'],
      },
    ],
  },
  {
    id: 'sep-15',
    date: '2026-09-15',
    weekday: 'Tuesday',
    title: 'Winelands',
    summary: 'Day trip to Stellenbosch — tasting, lunch, and a slow afternoon.',
    activities: [
      {
        time: '9:30 AM',
        title: 'Drive to Stellenbosch',
        place: 'City Bowl → Stellenbosch',
        type: 'booking',
        notes: ['~45–60 min by car · or book a wine-tour transfer'],
      },
      {
        time: '11:00 AM',
        title: 'Estate tasting',
        place: 'Stellenbosch winelands',
        maps: 'https://www.google.com/maps/search/?api=1&query=Stellenbosch+wine+estate',
        type: 'experience',
        notes: [
          'Pick one estate for a sit-down tasting',
          'Designate a driver or use a tour',
        ],
      },
      {
        time: '1:00 PM',
        title: 'Long lunch',
        place: 'Stellenbosch or Franschhoek',
        type: 'food',
        notes: ['Book ahead on weekends'],
      },
      {
        time: '4:30 PM',
        title: 'Return to Cape Town',
        place: 'City Bowl stay',
        type: 'stay',
        notes: ['Light dinner near the apartment'],
      },
    ],
  },
  {
    id: 'sep-16',
    date: '2026-09-16',
    weekday: 'Wednesday',
    title: 'Depart',
    summary: 'Morning free, then airport for the evening flight home.',
    activities: [
      {
        time: 'Morning',
        title: 'Coffee & last walk',
        place: 'Company’s Garden or Kloof Street',
        maps: 'https://www.google.com/maps/search/?api=1&query=Companys+Garden+Cape+Town',
        type: 'suggestion',
        notes: ['Pack before heading out · leave bags at the stay if needed'],
      },
      {
        time: '12:00 PM',
        title: 'Check out',
        place: 'Gardens / Tamboerskloof',
        type: 'stay',
      },
      {
        time: '5:15 PM',
        title: 'Cape Town → home',
        place: 'Cape Town International Airport (CPT)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Cape+Town+International+Airport',
        type: 'flight',
        notes: ['Arrive ~2.5 hours before international departure'],
        links: [{ label: 'Flight itinerary', href: '#' }],
      },
    ],
  },
]
