import groupPhoto from '../assets/group-photo.jpg';

/** One type per activity — drives chips / icons */
export type ActivityType =
  | 'flight'
  | 'airport'
  | 'train'
  | 'stay'
  | 'sight'
  | 'food'
  | 'experience'
  | 'suggestion';

export const activityTypes: Record<
  ActivityType,
  { label: string; emoji: string }
> = {
  flight: { label: 'Flight', emoji: '✈️' },
  airport: { label: 'Airport', emoji: '🛂' },
  train: { label: 'Train', emoji: '🚅' },
  stay: { label: 'Stay', emoji: '🏨' },
  sight: { label: 'Sight', emoji: '🎟️' },
  food: { label: 'Food', emoji: '🍜' },
  experience: { label: 'Experience', emoji: '🎨' },
  suggestion: { label: 'Suggestion', emoji: '💡' },
};

export type Activity = {
  /** e.g. "10:00 AM" or "Morning" */
  time?: string;
  /** What you're doing — the only required field */
  title: string;
  /** Neighbourhood, station, or venue name if useful */
  place?: string;
  /** Extra bits — seats, inclusions, tips, etc. */
  notes?: string[];
  /** One URL — Maps, booking, menu, etc. */
  link?: string;
  /** One type for chips / icons */
  type?: ActivityType;
};

export type Day = {
  id: string;
  date: string;
  weekday: string;
  title: string;
  summary: string;
  activities: Activity[];
};

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
};

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
        type: 'flight',
        notes: ['Arrives 4:00 PM', '6 hr 25 min layover in Kuala Lumpur'],
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Osaka',
        place: 'Malaysia Airlines MH52',
        type: 'flight',
        notes: ['Arrives 5:45 AM next day'],
      },
    ],
  },
  {
    id: 'jul-22',
    date: '2026-07-22',
    weekday: 'Wednesday',
    title: 'Arrival & Shibuya',
    summary:
      'Land at Kansai, travel to Tokyo and finish the day above Shibuya at sunset.',
    activities: [
      {
        time: '5:45 AM',
        title: 'Arrive Osaka',
        place: 'Kansai International Airport · Terminal 1',
        type: 'flight',
        notes: ['MH52 from Kuala Lumpur'],
      },
      {
        time: '6:00 AM',
        title: 'Immigration and luggage',
        place: 'Kansai International Airport',
        type: 'airport',
        notes: [
          'Allow approximately one hour after landing',
          'Collect or activate any transport cards before leaving the airport',
        ],
      },
      {
        time: '7:30 AM',
        title: 'HARUKA to Shin-Osaka',
        place: 'KIX → Shin-Osaka',
        type: 'train',
        notes: [
          'Limited express',
          'Journey takes approximately 50 minutes',
          'Allow additional time to find the Shinkansen platforms',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Nozomi to Tokyo',
        place: 'Shin-Osaka → Tokyo Station',
        type: 'train',
        notes: [
          'Shinkansen journey takes approximately 2 hr 30 min',
          'Reserve oversized-luggage seats if any suitcase exceeds the size limit',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Travel to the accommodation',
        place: 'Ōkubo / Shin-Ōkubo',
        type: 'stay',
        notes: [
          'Approximately 20–30 minutes from Tokyo Station',
          'Drop bags, have lunch and rest before travelling to Shibuya',
        ],
      },
      {
        time: '4:50 PM',
        title: 'Shibuya Sky Roof Bar Entry',
        place: 'Shibuya Sky',
        type: 'sight',
        notes: [
          'Arrive early because entry is tied to the booked time',
          'Allow time for queues and the lifts to the observation deck',
        ],
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: '5:40 PM',
        title: 'Shibuya Sky Sunset Access',
        place: 'Shibuya Sky',
        type: 'sight',
        notes: [
          'Stay through sunset and the early evening city lights',
          'Explore Shibuya Crossing and Hachikō afterwards',
        ],
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: 'Evening',
        title: 'Dinner in Shibuya',
        place: 'Shibuya',
        type: 'suggestion',
        notes: [
          'Keep dinner flexible after the long travel day',
          'Choose somewhere close to Shibuya Station for an easy trip home',
        ],
      },
    ],
  },
  {
    id: 'jul-23',
    date: '2026-07-23',
    weekday: 'Thursday',
    title: 'Harajuku & Borderless',
    summary:
      'A relaxed introduction to western Tokyo followed by teamLab Borderless.',
    activities: [
      {
        time: '8:00 AM',
        title: 'Meiji Jingu',
        place: 'Harajuku',
        type: 'suggestion',
        notes: [
          'Visit early before the weather becomes hotter',
          'Walk through the forested approach to the main shrine',
          'Allow approximately 60–90 minutes',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Explore Harajuku and Omotesando',
        place: 'Harajuku / Omotesando',
        type: 'suggestion',
        notes: [
          'Walk through Takeshita Street before it becomes too crowded',
          'Continue through the shops and cafés around Omotesando',
          'Have an early lunch before travelling to Azabudai Hills',
        ],
      },
      {
        time: '1:30 PM',
        title: 'teamLab Borderless',
        place: 'Azabudai Hills',
        type: 'sight',
        notes: [
          'Immersive digital-art museum with interconnected rooms',
          'Allow at least two to three hours',
          'Includes free gelato at En Tea Teahouse',
          'Wear comfortable shoes and keep phones charged for photos',
        ],
        link: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
      },
      {
        time: 'Late afternoon',
        title: 'Explore Azabudai Hills',
        place: 'Azabudai Hills',
        type: 'suggestion',
        notes: [
          'Explore the shops, architecture and gardens after teamLab',
          'Tokyo Tower is nearby if everyone still has energy',
        ],
      },
      {
        time: 'Evening',
        title: 'Flexible Tokyo evening',
        place: 'Shinjuku or Akasaka',
        type: 'suggestion',
        notes: [
          'Return to Shinjuku for dinner and a relaxed evening',
          'Optional alternative: watch Adelaide vs Collingwood at Irish Pub Craic in Akasaka',
          'Treat the AFL option as a same-day decision rather than a fixed booking',
        ],
      },
    ],
  },
  {
    id: 'jul-24',
    date: '2026-07-24',
    weekday: 'Friday',
    title: 'Old Tokyo',
    summary: 'Temples, market streets and neighbourhoods across eastern Tokyo.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Sensō-ji',
        place: 'Asakusa',
        type: 'suggestion',
        notes: [
          'Visit early for a quieter view of the temple and Kaminarimon Gate',
          'Walk through Nakamise Street as the shops begin opening',
          'Allow approximately two hours for the temple and surrounding streets',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Explore Asakusa',
        place: 'Asakusa',
        type: 'suggestion',
        notes: [
          'Browse traditional snacks, souvenirs and side streets',
          'Consider viewing Tokyo Skytree from across the Sumida River',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Ueno and Ameyoko',
        place: 'Ueno',
        type: 'suggestion',
        notes: [
          'Have lunch around Ameyoko Market',
          'Browse market stalls, street food and small shops',
          'Keep the afternoon flexible because of the July heat',
        ],
      },
      {
        time: '2:30 PM',
        title: 'Akihabara or Tokyo Station',
        place: 'Central Tokyo',
        type: 'suggestion',
        notes: [
          'Choose Akihabara for gaming, anime and electronics',
          'Choose Tokyo Station for Character Street, shops and the Marunouchi exterior',
          'Do not try to force both in if everyone is tired',
        ],
      },
      {
        time: 'Late afternoon',
        title: 'Forward luggage to Kyoto',
        place: 'Tokyo accommodation',
        type: 'suggestion',
        notes: [
          'Send the large suitcases directly to the Kyoto accommodation',
          'Confirm that the Kyoto accommodation can receive luggage',
          'Pack only a small overnight bag for Hakone',
        ],
      },
      {
        time: 'Evening',
        title: 'Final Tokyo dinner',
        place: 'Shin-Ōkubo or Shinjuku',
        type: 'food',
        notes: [
          'Keep the final evening close to the accommodation',
          'Prepare overnight bags and transport details for Hakone',
        ],
      },
    ],
  },
  {
    id: 'jul-25',
    date: '2026-07-25',
    weekday: 'Saturday',
    title: 'Tokyo to Hakone',
    summary: 'Travel into the mountains and cross Hakone towards Lake Ashi.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Travel to Shinjuku Station',
        place: 'Shin-Ōkubo → Shinjuku',
        type: 'train',
        notes: [
          'Leave enough time to find the Romancecar platform',
          'Bring only the overnight luggage needed for Hakone',
        ],
      },
      {
        time: '8:00 AM',
        title: 'Romancecar to Hakone',
        place: 'Shinjuku → Hakone-Yumoto',
        type: 'suggestion',
        notes: [
          'Reserve seats in advance',
          'Direct limited-express service takes approximately 90 minutes',
          'Exact departure time can be updated once tickets are booked',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Hakone Tozan Railway',
        place: 'Hakone-Yumoto → Gora',
        type: 'suggestion',
        notes: [
          'Scenic mountain railway through the Hakone area',
          'The Hakone Freepass may cover much of the local transport',
        ],
      },
      {
        time: '11:30 AM',
        title: 'Cable car and Hakone Ropeway',
        place: 'Gora → Sōunzan → Owakudani',
        type: 'suggestion',
        notes: [
          'Stop at Owakudani for the volcanic landscape',
          'Try the local black eggs if available',
          'Ropeway services can change because of weather or volcanic conditions',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Lake Ashi sightseeing cruise',
        place: 'Tōgendai → Hakone-machi',
        type: 'suggestion',
        notes: [
          'Cruise across Lake Ashi towards the accommodation side of Hakone',
          'Mount Fuji views are possible but should be treated as a bonus',
          'Check the final cruise times before starting the Hakone loop',
        ],
      },
      {
        time: 'Late afternoon',
        title: 'Check in to the Hakone accommodation',
        place: '571-30 Hakone, Hakone-machi',
        type: 'stay',
        notes: [
          'Take a local bus or taxi from Hakone-machi port',
          'The accommodation is near the Lake Ashi side of Hakone',
          'Confirm dinner plans because nearby restaurants may close early',
        ],
      },
      {
        time: 'Evening',
        title: 'Quiet evening in Hakone',
        place: 'Hakone-machi',
        type: 'suggestion',
        notes: [
          'Rest after the Hakone loop',
          'Use an onsen if the accommodation provides access to one',
          'Bring food or snacks if the accommodation is self-catered',
        ],
      },
    ],
  },
  {
    id: 'jul-26',
    date: '2026-07-26',
    weekday: 'Sunday',
    title: 'Hakone to Kyoto',
    summary: 'A calm Lake Ashi morning followed by the journey west to Kyoto.',
    activities: [
      {
        time: 'Morning',
        title: 'Lake Ashi and Hakone Shrine',
        place: 'Moto-Hakone',
        type: 'suggestion',
        notes: [
          'Visit the lakeside torii gate and the forested shrine',
          'Go early before the area becomes busier',
          'Skip or shorten this activity if transport connections are tight',
        ],
      },
      {
        time: '11:00 AM',
        title: 'Bus to Mishima Station',
        place: 'Hakone-machi → Mishima',
        type: 'suggestion',
        notes: [
          'This route avoids backtracking through Hakone-Yumoto',
          'Allow extra time for traffic and luggage',
          'Confirm the timetable closer to the travel date',
        ],
      },
      {
        time: '1:30 PM',
        title: 'Shinkansen to Kyoto',
        place: 'Mishima → Kyoto',
        type: 'suggestion',
        notes: [
          'Reserve seats once the Hakone bus timing is confirmed',
          'Some services may require a transfer depending on the train selected',
        ],
      },
      {
        time: 'Late afternoon',
        title: 'Check in to the Kyoto accommodation',
        place: 'Kyoto',
        type: 'stay',
        notes: [
          'Collect any luggage forwarded from Tokyo',
          'Rest before heading out for the evening',
        ],
      },
      {
        time: 'Evening',
        title: 'Gion evening walk',
        place: 'Gion and Yasaka Shrine',
        type: 'suggestion',
        notes: [
          'Walk through Hanamikoji Street and the Shirakawa area',
          'Visit Yasaka Shrine after sunset',
          'Have dinner around Gion, Kawaramachi or Pontocho',
        ],
      },
    ],
  },
  {
    id: 'jul-27',
    date: '2026-07-27',
    weekday: 'Monday',
    title: 'Historic Kyoto',
    summary:
      'Fushimi Inari, Kiyomizu-dera and the traditional streets of eastern Kyoto.',
    activities: [
      {
        time: '6:30 AM',
        title: 'Fushimi Inari Taisha',
        place: 'Fushimi',
        type: 'suggestion',
        notes: [
          'Start early before the heat and crowds',
          'Walk beyond the busiest lower torii gates for a quieter experience',
          'There is no need to climb to the summit unless everyone wants to',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Breakfast and rest',
        place: 'Kyoto',
        type: 'food',
        notes: [
          'Have breakfast after returning from Fushimi Inari',
          'Use this break to cool down before the next walking area',
        ],
      },
      {
        time: '10:30 AM',
        title: 'Kiyomizu-dera',
        place: 'Higashiyama',
        type: 'suggestion',
        notes: [
          'Explore the temple and its hillside views',
          'Expect slopes, stairs and limited shade',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Sannenzaka and Ninenzaka',
        place: 'Higashiyama',
        type: 'suggestion',
        notes: [
          'Walk through the preserved historic streets',
          'Browse cafés, sweets and traditional shops',
          'Continue towards Yasaka Pagoda if everyone has energy',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Lunch and afternoon rest',
        place: 'Kyoto',
        type: 'food',
        notes: [
          'Take a proper break during the hottest part of the day',
          'Return to the accommodation before the evening',
        ],
      },
      {
        time: 'Evening',
        title: 'Pontocho and Kawaramachi',
        place: 'Central Kyoto',
        type: 'suggestion',
        notes: [
          'Explore the narrow Pontocho alley after sunset',
          'Choose dinner around the Kamo River or Kawaramachi',
        ],
      },
    ],
  },
  {
    id: 'jul-28',
    date: '2026-07-28',
    weekday: 'Tuesday',
    title: 'Nara Day Trip',
    summary: 'A day among Nara’s deer, temples, gardens and historic streets.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Train to Nara',
        place: 'Kyoto → Nara',
        type: 'suggestion',
        notes: [
          'Leave early to arrive before the largest crowds',
          'Kintetsu Nara Station is generally closer to Nara Park',
          'The exact route will depend on the Kyoto accommodation location',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Nara Park',
        place: 'Nara Park',
        type: 'suggestion',
        notes: [
          'Walk through the park and see the free-roaming deer',
          'Only feed deer approved shika senbei crackers',
          'Keep food, maps and loose belongings secured around the deer',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Tōdai-ji',
        place: 'Nara Park',
        type: 'suggestion',
        notes: [
          'Visit the Great Buddha Hall and its enormous bronze Buddha',
          'Allow approximately one hour for the temple complex',
          'This is one of the main highlights of the Nara day trip',
        ],
      },
      {
        time: '11:30 AM',
        title: 'Nigatsu-dō',
        place: 'Tōdai-ji complex',
        type: 'suggestion',
        notes: [
          'Walk uphill for a quieter temple area and views across Nara',
          'Skip this detour if the weather is excessively hot',
        ],
      },
      {
        time: '12:30 PM',
        title: 'Lunch in Nara',
        place: 'Nara Park or Higashimuki',
        type: 'food',
        notes: [
          'Try kakinoha-zushi, udon or another local specialty',
          'Use lunch as a proper air-conditioned rest break',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Kasuga Taisha',
        place: 'Nara Park',
        type: 'suggestion',
        notes: [
          'Walk through the lantern-lined forest paths',
          'The shrine is known for its stone and bronze lanterns',
          'Consider using a local bus if everyone is tired from walking',
        ],
      },
      {
        time: '3:30 PM',
        title: 'Explore Naramachi',
        place: 'Naramachi',
        type: 'suggestion',
        notes: [
          'Browse preserved merchant streets, cafés and small shops',
          'This can be shortened or skipped depending on energy levels',
        ],
      },
      {
        time: '5:00 PM',
        title: 'Return to Kyoto',
        place: 'Nara → Kyoto',
        type: 'train',
        notes: [
          'Return before dinner',
          'Keep the final Kyoto evening relaxed after the day trip',
        ],
      },
    ],
  },
  {
    id: 'jul-29',
    date: '2026-07-29',
    weekday: 'Wednesday',
    title: 'Kyoto to Osaka',
    summary:
      'Travel to Osaka, paint a daruma and experience Dotonbori after dark.',
    activities: [
      {
        time: 'Morning',
        title: 'Travel to Osaka',
        place: 'Kyoto → Osaka',
        type: 'train',
        notes: [
          'Check out and travel after the morning rush where possible',
          'Drop luggage at the Osaka accommodation before sightseeing',
          'Exact train route depends on both accommodation locations',
        ],
      },
      {
        time: 'TBC',
        title: 'Daruma painting experience',
        place: 'Osaka · venue TBC',
        type: 'experience',
        notes: [
          'Paint and personalise a traditional Japanese daruma',
          'Add the confirmed venue, booking time and link once available',
          'Allow travel time from the Osaka accommodation',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Explore Osaka',
        place: 'Namba, Umeda or Osaka Castle',
        type: 'suggestion',
        notes: [
          'Choose an area based on the daruma experience location',
          'Do not cross the city unnecessarily during the hottest part of the day',
          'Return to the accommodation for a break before Dotonbori',
        ],
      },
      {
        time: 'Evening',
        title: 'Dotonbori at night',
        place: 'Dotonbori and Namba',
        type: 'sight',
        notes: [
          'See the illuminated canal and Glico running-man sign',
          'Walk through Hozenji Yokocho',
          'Try takoyaki, okonomiyaki or kushikatsu',
          'This is a better fit than attempting Dotonbori after Universal Studios',
        ],
      },
    ],
  },
  {
    id: 'jul-30',
    date: '2026-07-30',
    weekday: 'Thursday',
    title: 'Universal Studios',
    summary:
      'A possible full day at Universal Studios Japan before the flight home.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Arrive at Universal Studios Japan',
        place: 'Universal City',
        type: 'suggestion',
        notes: [
          'Arrive well before the official opening time',
          'Actual gates may open earlier on busy days',
          'Download the official USJ app before arriving',
        ],
      },
      {
        time: 'All day',
        title: 'Universal Studios Japan',
        place: 'Universal City',
        type: 'suggestion',
        notes: [
          'A Studio Pass is required for park admission',
          'An Express Pass is separate and may include timed-area entry',
          'Prioritise Super Nintendo World and the attractions most important to the group',
          'Book as soon as the group decides to attend',
          'Keep this marked as a suggestion until tickets are purchased',
        ],
      },
      {
        time: 'Evening',
        title: 'Return to the accommodation',
        place: 'Osaka',
        type: 'stay',
        notes: [
          'Have a simple dinner near the accommodation or Universal City',
          'Pack before bed for the early airport transfer',
        ],
      },
    ],
  },
  {
    id: 'jul-31',
    date: '2026-07-31',
    weekday: 'Friday',
    title: 'Homeward',
    summary: 'Osaka → Kuala Lumpur → Adelaide. Arrive Saturday morning.',
    activities: [
      {
        time: '6:00 AM',
        title: 'Travel to Kansai Airport',
        place: 'Osaka → KIX',
        type: 'suggestion',
        notes: [
          'Aim to arrive approximately three hours before departure',
          'Update the departure time once the Osaka accommodation is confirmed',
          'Confirm the first available airport train or transfer option',
        ],
      },
      {
        time: '9:55 AM',
        title: 'Osaka → Kuala Lumpur',
        place: 'Malaysia Airlines MH53',
        type: 'flight',
        notes: ['Arrives 3:45 PM', '6 hr 40 min layover in Kuala Lumpur'],
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Adelaide',
        place: 'Malaysia Airlines MH139',
        type: 'flight',
        notes: ['Arrives 7:00 AM Sat 1 Aug'],
      },
    ],
  },
];
