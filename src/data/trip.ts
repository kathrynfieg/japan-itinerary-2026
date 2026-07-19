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
    title: 'Day 1',
    summary:
      'Land at Kansai, travel to Tokyo and spend the evening exploring Shibuya.',
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
          'Limited-express airport train',
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
          'Reserve oversized-luggage seats if required',
          'Pick up an ekiben, snacks or drinks before boarding',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Travel to the accommodation',
        place: 'Ōkubo / Shin-Ōkubo',
        type: 'stay',
        notes: [
          'Approximately 20–30 minutes from Tokyo Station',
          'Drop off luggage before heading out again',
        ],
      },
      {
        time: '12:45 PM',
        title: 'First Japanese 7-Eleven stop',
        place: 'Near the accommodation',
        type: 'food',
        notes: [
          'Pick up cold drinks, snacks and breakfast supplies',
          'Try an onigiri, egg sandwich, fried chicken or convenience-store dessert',
          'Use the ATM or withdraw cash if required',
          'Keep this quick so there is still time to rest before Shibuya',
        ],
      },
      {
        time: '1:15 PM',
        title: 'Rest and reset',
        place: 'Accommodation',
        type: 'stay',
        notes: [
          'Have lunch, shower and rest after the overnight journey',
          'Charge phones and portable batteries',
          'Aim to leave for Shibuya at approximately 3:30 PM',
        ],
      },
      {
        time: '3:30 PM',
        title: 'Train to Shibuya',
        place: 'Shin-Ōkubo → Shibuya',
        type: 'train',
        notes: [
          'Allow extra time to navigate Shibuya Station',
          'Head towards the Hachikō exit',
        ],
      },
      {
        time: '4:05 PM',
        title: 'Hachikō and Shibuya Crossing',
        place: 'Hachikō Square',
        type: 'sight',
        notes: [
          'See the Hachikō statue outside Shibuya Station',
          'Walk across the famous Shibuya Scramble Crossing',
          'Keep this visit brief so the Shibuya Sky booking is not rushed',
          'You can return after dark for the full neon-lit experience',
        ],
      },
      {
        time: '4:50 PM',
        title: 'Shibuya Sky Roof Bar Entry',
        place: 'Shibuya Sky',
        type: 'sight',
        notes: [
          'Arrive early because entry is tied to the booked time',
          'Explore the indoor gallery and outdoor observation areas',
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
          'Look for Tokyo Tower, Tokyo Skytree and Mount Fuji if visibility is good',
          'Allow the departure time to remain flexible',
        ],
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: '7:15 PM',
        title: 'Shibuya PARCO',
        place: 'Shibuya PARCO · 6F',
        type: 'suggestion',
        notes: [
          'Visit Nintendo TOKYO and Pokémon Center Shibuya',
          'The floor also has several other gaming and character stores',
          'Aim to arrive before 8:00 PM because the shops close at 9:00 PM',
          'Swap this for Shibuya 109 if fashion is a higher priority',
        ],
      },
      {
        time: '8:30 PM',
        title: 'Dinner in Shibuya',
        place: 'Dōgenzaka',
        type: 'food',
        notes: [
          'Recommended easy option: Uobei for affordable made-to-order sushi',
          'Alternative: Gyukatsu Motomura for beef cutlet if the queue is reasonable',
        ],
      },
      {
        time: '9:30 PM',
        title: 'MEGA Don Quijote',
        place: 'Shibuya',
        type: 'suggestion',
        notes: [
          'Browse Japanese snacks, beauty products, souvenirs and travel essentials',
          'The store is open late, so there is no need to rush here before dinner',
          'Avoid buying too much on the first night because everything must travel with you',
        ],
      },
      {
        time: '10:15 PM',
        title: 'Shibuya Crossing at night',
        place: 'Shibuya Scramble Crossing',
        type: 'sight',
        notes: [
          'Walk across again once the billboards and surrounding streets are illuminated',
          'Head back to the accommodation whenever the group begins feeling tired',
        ],
      },
    ],
  },
  {
    id: 'jul-23',
    date: '2026-07-23',
    weekday: 'Thursday',
    title: 'Day 2',
    summary:
      'Explore Meiji Jingu, Harajuku and Omotesando before an immersive afternoon at teamLab Borderless.',
    activities: [
      {
        time: '8:00 AM',
        title: 'Meiji Jingu',
        place: 'Harajuku',
        type: 'suggestion',
        notes: [
          'A peaceful Shinto shrine surrounded by a large forest in the middle of Tokyo.',
          'It is a beautiful contrast to the busy streets of Harajuku and a calm way to begin the day.',
          'Walk through the enormous torii gates and follow the forested path to the main shrine.',
          'Look out for the decorative sake barrels displayed along the approach.',
          'Allow approximately 60–90 minutes and visit early before the heat and crowds build.',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Explore Harajuku',
        place: 'Takeshita Street',
        type: 'suggestion',
        notes: [
          'Harajuku is one of Tokyo’s best-known neighbourhoods for colourful fashion, character shops, street food and youth culture.',
          'Walk down Takeshita Street and browse the small fashion, accessory and souvenir stores.',
          'Try a Japanese crepe, candied fruit or another fun street snack.',
          'Visit stores such as Kiddy Land, the Sanrio shop or character-themed shops that interest the group.',
          'Takeshita Street becomes extremely crowded later in the day, so exploring during the morning is ideal.',
        ],
      },
      {
        time: '11:15 AM',
        title: 'Walk through Omotesando',
        place: 'Harajuku → Omotesando',
        type: 'suggestion',
        notes: [
          'Omotesando is a stylish tree-lined avenue known for impressive architecture, designer stores and polished cafés.',
          'It feels calmer and more sophisticated than neighbouring Takeshita Street.',
          'Browse Omotesando Hills and the flagship stores along the main avenue.',
          'Stop for an early lunch or coffee before travelling to Azabudai Hills.',
          'Keep the shopping flexible so there is plenty of time to reach teamLab.',
        ],
      },
      {
        time: '12:15 PM',
        title: 'Travel to Azabudai Hills',
        place: 'Omotesando → Kamiyachō',
        type: 'train',
        notes: [
          'Azabudai Hills is a modern city precinct with landscaped public spaces, restaurants, shops and striking architecture.',
          'Allow approximately 30–40 minutes for the train journey and walking through the complex.',
          'Have lunch before teamLab if you did not eat around Omotesando.',
          'Aim to arrive at least 15–20 minutes before the booked entry time.',
        ],
      },
      {
        time: '1:30 PM',
        title: 'teamLab Borderless',
        place: 'Azabudai Hills',
        type: 'sight',
        notes: [
          'An immersive digital-art museum where projections, light, sound and interactive artworks flow between interconnected rooms.',
          'There is no fixed route, which makes exploring and discovering hidden installations part of the experience.',
          'Take your time moving between rooms because some artworks change or appear differently when revisited.',
          'Look for the Bubble Universe, Infinite Crystal World and the flower-filled interactive spaces.',
          'Allow approximately two to three hours and wear comfortable shoes.',
          'Includes free gelato at EN TEA HOUSE.',
        ],
        link: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
      },
      {
        time: '4:30 PM',
        title: 'Explore Azabudai Hills',
        place: 'Azabudai Hills',
        type: 'suggestion',
        notes: [
          'A newly developed neighbourhood combining unusual architecture, gardens, shops, cafés and city views.',
          'It is worth exploring after teamLab rather than immediately leaving the area.',
          'Walk through the central garden and admire the curved architecture of the surrounding buildings.',
          'Browse the shops or stop for a drink and dessert.',
          'Tokyo Tower is nearby and can be added if everyone still has energy.',
        ],
      },
      {
        time: '5:30 PM',
        title: 'Tokyo Tower and Zōjō-ji',
        place: 'Minato City',
        type: 'suggestion',
        notes: [
          'Tokyo Tower is one of the city’s most recognisable landmarks, inspired by the Eiffel Tower and painted bright orange and white.',
          'The nearby Zōjō-ji temple provides one of the best ground-level views of the tower.',
          'Walk around the temple grounds and photograph the contrast between old Tokyo and the modern skyline.',
          'Going up Tokyo Tower is optional because Shibuya Sky already provides a major observation-deck experience.',
          'Skip this stop and head back earlier if the group is tired.',
        ],
      },
      {
        time: 'Evening',
        title: 'Dinner in Shinjuku',
        place: 'Shinjuku',
        type: 'food',
        notes: [
          'Shinjuku is one of Tokyo’s busiest entertainment districts, filled with restaurants, neon streets, department stores and late-night activity.',
          'Explore Omoide Yokocho for narrow lantern-lit alleys and small yakitori restaurants.',
          'Walk through Kabukichō to see the neon signs and the giant Godzilla head above Hotel Gracery.',
          'Consider ramen, yakitori, Japanese curry or izakaya-style shared dishes for dinner.',
          'Keep the evening flexible and return to the accommodation whenever the group begins feeling tired.',
          'Optional alternative: watch Adelaide vs Collingwood at Irish Pub Craic in Akasaka.',
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
